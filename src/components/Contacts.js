import React, { useEffect } from 'react';
import { db } from '../firebase';
import ContactForm from './ContactForm';

const Contacts = () => {
  const addContact = async (contact) => {
    await db.collection('contacts').doc().set(contact);
    alert('contact added!');
  };

  const getContacts = async () => {
    const querySnapshot = await db.collection('contacts').get();
    querySnapshot.forEach((doc) => {
      console.table(doc.data());
    });
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <>
      <ContactForm addContact={addContact} />
      <div>Hello From Users</div>
    </>
  );
};

export default Contacts;
