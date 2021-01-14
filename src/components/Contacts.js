import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import ContactForm from './ContactForm';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  const addContact = async (contact) => {
    await db.collection('contacts').doc().set(contact);
    alert('contact added!');
  };

  const deleteContact = async (id) => {
    if (window.confirm('are you sure you want to delete this contact?')) {
      await db.collection('contacts').doc(id).delete();
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
        <ContactForm addContact={addContact} />
      </div>
      <div className='col-md-8 p-2'>
        {contacts.map((contact) => (
          <div className='card mb-1' key={contact.id}>
            <div className='card-body'>
              <div className='d-flex justify-content-between'>
                <h5>{contact.name}</h5>
                <i
                  className='material-icons text-danger'
                  onClick={() => deleteContact(contact.id)}>
                  close
                </i>
              </div>
              <h5>{contact.phone}</h5>
              <h5>{contact.email}</h5>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Contacts;
