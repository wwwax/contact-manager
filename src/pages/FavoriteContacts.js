import React, { useState, useEffect } from 'react';
import { db } from '../firebase';

const FavoriteContacts = () => {
  const [favoriteContacts, setFavoriteContacts] = useState([]);

  const getContacts = async () => {
    db.collection('contacts').onSnapshot((querySnapshot) => {
      const allContacts = [];
      querySnapshot.forEach((el) => {
        allContacts.push(el.data());
      });
      setFavoriteContacts(allContacts.filter((contact) => contact.favorite));
    });
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className='row'>
      <div className='col-md-12 p-2'>
        {favoriteContacts.map((contact) => (
          <div className='card mb-2' key={contact.id}>
            <div className='card-body'>
              <h5>{contact.name}</h5>
              <h5>{contact.tel}</h5>
              <h5>{contact.email}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteContacts;
