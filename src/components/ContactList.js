import React from 'react';
import { toast } from 'react-toastify';
import { db } from '../firebase';

const ContactList = ({ contacts, setModalIsOpen, setIdForEdit }) => {
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

  const onEditButtonClick = (id) => {
    setModalIsOpen(true);
    setIdForEdit(id);
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

  return (
    <div className='row'>
      <div className='col-md-12'>
        <div className='d-flex justify-content-center align-items-center'>
          <h3 className='text-center p-4'>Contacts</h3>
          <i
            className='material-icons text-success'
            style={{ cursor: 'pointer' }}
            onClick={() => setModalIsOpen(true)}>
            add
          </i>
        </div>

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
                    onClick={() => onEditButtonClick(contact.id)}>
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
    </div>
  );
};

export default ContactList;
