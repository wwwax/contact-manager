import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { db } from '../firebase';
import ContactForm from './ContactForm';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [idForEdit, setIdForEdit] = useState('');

  const addContact = async (contact) => {
    try {
      await db.collection('contacts').doc().set(contact);
      toast('Contact Added', {
        type: 'success',
        autoClose: 1000,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const editContact = async (contact) => {
    try {
      await db.collection('contacts').doc(idForEdit).update(contact);
      toast('Contact Updated', {
        type: 'info',
        autoClose: 1000,
      });
      setIdForEdit('');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteContact = async (id) => {
    if (window.confirm('are you sure you want to delete this contact?')) {
      await db.collection('contacts').doc(id).delete();
      toast('Contact Deleted', {
        type: 'error',
        autoClose: 1000,
      });
    }
  };

  const getContacts = async () => {
    db.collection('contacts').onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setContacts(docs);
    });
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <>
      <div className='col-md-4 p-2'>
        <ContactForm {...{ addContact, editContact, idForEdit }} />
      </div>
      <div className='col-md-8 p-2'>
        {contacts.map((contact) => (
          <div className='card mb-1' key={contact.id}>
            <div className='card-body'>
              <div className='d-flex justify-content-between'>
                <h5>{contact.name}</h5>
                <div>
                  <i className='material-icons' onClick={() => setIdForEdit(contact.id)}>
                    edit
                  </i>
                  <i
                    className='material-icons text-danger'
                    onClick={() => deleteContact(contact.id)}>
                    close
                  </i>
                </div>
              </div>
              <h5>{contact.tel}</h5>
              <h5>{contact.email}</h5>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Contacts;
