import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { db } from '../firebase';

Modal.setAppElement('#root');

const Contacts = () => {
  const [contact, setContact] = useState({ name: '', tel: '', email: '' });
  const [contacts, setContacts] = useState([]);
  const [modalAddIsOpen, setModalAddIsOpen] = useState(false);
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);

  const getContacts = async () => {
    try {
      db.collection('contacts').onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setContacts(docs);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await db.collection('contacts').doc(id).delete();
      toast('Contact Removed', {
        type: 'success',
        autoClose: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFavorites = async (contact) => {
    try {
      await db
        .collection('contacts')
        .doc(contact.id)
        .update({ ...contact, favorite: !contact.favorite });
      toast(
        !contact.favorite
          ? 'Contact Added To Favorites'
          : 'Contact Removed From Favorites',
        {
          type: 'success',
          autoClose: 1500,
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  /**
  |--------------------------------------------------
  | FORM
  |--------------------------------------------------
  */

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const validateEmail = (str) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(str).toLowerCase());
  };

  const validateTelNumber = (telNumber) => {
    const re = /^\d+$/;
    return re.test(telNumber);
  };

  /**
  |--------------------------------------------------
  | ADD
  |--------------------------------------------------
  */

  const addContact = async (contact) => {
    try {
      await db.collection('contacts').doc().set(contact);
      toast('Contact Added', {
        type: 'success',
        autoClose: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();

    if (!validateTelNumber(contact.tel)) {
      return toast('Invalid Telephone Number', {
        type: 'error',
        autoClose: 1500,
      });
    }

    if (!validateEmail(contact.email)) {
      return toast('Invalid Email', {
        type: 'error',
        autoClose: 1500,
      });
    }

    addContact({ ...contact, favorite: false });
    setContact({ name: '', tel: '', email: '' });
    setModalAddIsOpen(false);
  };

  /**
  |--------------------------------------------------
  | EDIT
  |--------------------------------------------------
  */

  const getContactById = async (id) => {
    const selectedContact = await (await db.collection('contacts').doc(id).get()).data();
    setContact({ ...selectedContact, id });
  };

  const onEditClick = (id) => {
    setModalEditIsOpen(true);
    getContactById(id);
  };

  const updateContact = async () => {
    try {
      await db.collection('contacts').doc(contact.id).update(contact);
      toast('Contact Updated', {
        type: 'success',
        autoClose: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    if (!validateTelNumber(contact.tel)) {
      return toast('Invalid Telephone Number', {
        type: 'error',
        autoClose: 1500,
      });
    }

    if (!validateEmail(contact.email)) {
      return toast('Invalid Email', {
        type: 'error',
        autoClose: 1500,
      });
    }

    updateContact(contact);
    setContact({ name: '', tel: '', email: '' });
    setModalEditIsOpen(false);
  };

  /**
  |--------------------------------------------------
  | USE EFFECT
  |--------------------------------------------------
  */

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className='row'>
      <div className='col-md-12 p-2'>
        <h3 className='text-center p-4'>Contacts</h3>

        <button
          className='btn btn-primary btn-block mb-4'
          onClick={() => setModalAddIsOpen(true)}>
          Add Contact
        </button>

        {contacts.map((contact) => (
          <div className='card mb-2' key={contact.id}>
            <div className='card-body'>
              <div className='d-flex justify-content-between'>
                <div>
                  <h5 className='text-success'>{contact.name}</h5>
                  <h5>{contact.tel}</h5>
                  <h5>{contact.email}</h5>
                </div>

                <div>
                  <i
                    className={
                      !contact.favorite ? 'material-icons' : 'material-icons text-success'
                    }
                    style={{ cursor: 'pointer' }}
                    onClick={() => toggleFavorites(contact)}>
                    star
                  </i>

                  <i
                    className='material-icons'
                    style={{ cursor: 'pointer' }}
                    onClick={() => onEditClick(contact.id)}>
                    edit
                  </i>

                  <i
                    className='material-icons'
                    style={{ cursor: 'pointer' }}
                    onClick={() => deleteContact(contact.id)}>
                    delete
                  </i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalAddIsOpen}
        onRequestClose={() => setModalAddIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: '#32383E',
          },
          content: {
            padding: 0,
            backgroundColor: '#272B30',
          },
        }}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 p-2'>
              <form className='card card-body' onSubmit={handleAddSubmit}>
                <div className='form-group input-group'>
                  <div className='input-group-text bg-light'>
                    <i className='material-icons'>person</i>
                  </div>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='Name'
                    name='name'
                    value={contact.name}
                    required
                    onChange={handleInputChange}
                  />
                </div>

                <div className='form-group input-group'>
                  <div className='input-group-text bg-light'>
                    <i className='material-icons'>phone</i>
                  </div>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='Tel'
                    name='tel'
                    value={contact.tel}
                    required
                    onChange={handleInputChange}
                  />
                </div>

                <div className='form-group input-group'>
                  <div className='input-group-text bg-light'>
                    <i className='material-icons'>email</i>
                  </div>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='Email'
                    name='email'
                    value={contact.email}
                    required
                    onChange={handleInputChange}
                  />
                </div>

                <button className='btn btn-success btn-block'>Add</button>
              </form>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalEditIsOpen}
        onRequestClose={() => setModalEditIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: '#32383E',
          },
          content: {
            padding: 0,
            backgroundColor: '#272B30',
          },
        }}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 p-2'>
              <form className='card card-body' onSubmit={handleEditSubmit}>
                <div className='form-group input-group'>
                  <div className='input-group-text bg-light'>
                    <i className='material-icons'>person</i>
                  </div>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='Name'
                    name='name'
                    value={contact.name}
                    required
                    onChange={handleInputChange}
                  />
                </div>

                <div className='form-group input-group'>
                  <div className='input-group-text bg-light'>
                    <i className='material-icons'>phone</i>
                  </div>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='Tel'
                    name='tel'
                    value={contact.tel}
                    required
                    onChange={handleInputChange}
                  />
                </div>

                <div className='form-group input-group'>
                  <div className='input-group-text bg-light'>
                    <i className='material-icons'>email</i>
                  </div>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='Email'
                    name='email'
                    value={contact.email}
                    required
                    onChange={handleInputChange}
                  />
                </div>

                <button className='btn btn-success btn-block'>Update</button>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Contacts;
