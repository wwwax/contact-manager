import React, { useState, useEffect } from 'react';
import ContactList from '../components/ContactList';
import ModalWindow from '../components/ModalWindow';
import { db } from '../firebase';
import { IContact } from '../interfaces';
import { useModal } from '../hooks';

const ContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [idForEdit, setIdForEdit] = useState('');
  const [isModalOpen, , toggleModal] = useModal();

  const getContacts = () => {
    try {
      db.collection('contacts').onSnapshot((querySnapshot) => {
        const allContacts: any = [];

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
      <div className='col-md-12 d-flex justify-content-center'>
        <button className='btn btn-success btn-lg' onClick={toggleModal}>
          Add
        </button>
      </div>

      <ContactList
        title={'Contacts'}
        contacts={contacts}
        toggleModal={toggleModal}
        setIdForEdit={setIdForEdit}
      />
      <ModalWindow
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        idForEdit={idForEdit}
        setIdForEdit={setIdForEdit}
      />
    </>
  );
};

export default ContactsPage;
