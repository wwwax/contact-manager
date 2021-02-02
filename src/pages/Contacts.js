import React, { useEffect, useState } from 'react';
import ContactList from '../components/ContactList';
import ModalWindow from '../components/ModalWindow';
import { db } from '../firebase';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [idForEdit, setIdForEdit] = useState('');

  const getContacts = async () => {
    try {
      db.collection('contacts').onSnapshot((querySnapshot) => {
        const allContacts = [];
        querySnapshot.forEach((doc) => {
          allContacts.push({ ...doc.data(), id: doc.id });
        });
        setContacts(allContacts);
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
      <div className='col-md-12'>
        <div className='d-flex justify-content-center'>
          <button className='btn btn-success btn-lg' onClick={() => setModalIsOpen(true)}>
            Add
          </button>
        </div>
      </div>

      <ContactList
        title={'Contacts'}
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

export default Contacts;
