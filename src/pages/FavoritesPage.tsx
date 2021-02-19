import React, { useState, useEffect } from 'react';
import ContactList from '../components/ContactList';
import ModalWindow from '../components/ModalWindow';
import { db } from '../firebase';
import { IContact } from '../interfaces';
import { useModal } from '../hooks';

const FavoritesPage: React.FC = () => {
  const [favoriteContacts, setFavoriteContacts] = useState<IContact[]>([]);
  const [idForEdit, setIdForEdit] = useState('');
  const [isModalOpen, , toggleModal] = useModal();

  const getFavoriteContacts = () => {
    db.collection('contacts').onSnapshot((querySnapshot) => {
      const allContacts: Array<any> = [];

      querySnapshot.forEach((doc) => {
        allContacts.push({ ...doc.data(), id: doc.id });
      });

      const filteredContacts = allContacts.filter((contact) => contact.favorite);
      setFavoriteContacts(filteredContacts);
    });
  };

  useEffect(() => {
    getFavoriteContacts();
  }, []);

  return (
    <>
      <ContactList
        title={'Favorites'}
        contacts={favoriteContacts}
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

export default FavoritesPage;
