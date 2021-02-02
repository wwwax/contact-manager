import React, { useEffect, useState } from 'react';
import ContactList from '../components/ContactList';
import ModalWindow from '../components/ModalWindow';
import { db } from '../firebase';

const Favorites = () => {
  const [contacts, setContacts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [idForEdit, setIdForEdit] = useState('');

  const getContacts = async () => {
    try {
      db.collection('contacts').onSnapshot((querySnapshot) => {
        const allContacts = [];
        querySnapshot.forEach((el) => {
          allContacts.push(el.data());
        });

        setContacts(allContacts.filter((contact) => contact.favorite));
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <>
      <ContactList
        title={'Favorites'}
        contacts={contacts}
        setModalIsOpen={setModalIsOpen}
        setIdForEdit={setIdForEdit}
      />
      <ModalWindow
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        idForEdit={idForEdit}
        setIdForEdit={setIdForEdit}
      />
    </>
  );
};

export default Favorites;
