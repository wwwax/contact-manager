import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { db } from '../firebase';

Modal.setAppElement('#root');

const ModalWindow = ({ modalIsOpen, setModalIsOpen, idForEdit, setIdForEdit }) => {
  const initialContactState = {
    name: '',
    tel: '',
    email: '',
  };

  const [contact, setContact] = useState({ ...initialContactState });

  const addContact = async () => {
    try {
      await db
        .collection('contacts')
        .doc()
        .set({ ...contact, favorite: false });
      toast('Contact Added', {
        type: 'success',
        autoClose: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async () => {
    try {
      await db.collection('contacts').doc(idForEdit).update(contact);
      toast('Contact Updated', {
        type: 'success',
        autoClose: 1500,
      });
      setIdForEdit('');
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleSubmit = (e) => {
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

    idForEdit === '' ? addContact() : updateContact();

    setContact({ name: '', tel: '', email: '', favorite: false });
    setModalIsOpen(false);
  };

  const getContactById = async (id) => {
    const selectedContact = await db.collection('contacts').doc(id).get();
    setContact({ ...selectedContact.data() });
  };

  useEffect(() => {
    if (idForEdit === '') {
      setContact({ ...initialContactState });
    } else {
      getContactById(idForEdit);
    }
  }, [idForEdit]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
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
            <form className='card card-body' onSubmit={handleSubmit}>
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

              <button className='btn btn-success btn-block'>
                {idForEdit === '' ? 'Update' : 'Add'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalWindow;
