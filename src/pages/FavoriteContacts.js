import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { db } from '../firebase';

const FavoriteContacts = () => {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    db.collection('favorite-contacts').onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setContacts(docs);
    });
  };

  const removeFromFavorites = async (id) => {
    await db.collection('favorite-contacts').doc(id).delete();
    toast('Contact Removed From Favorites', {
      type: 'error',
      autoClose: 1500,
    });
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <>
      <div className='row'>
        <div className='col-md-12 p-2'>
          {contacts.map((contact) => (
            <div className='card mb-2' key={contact.id}>
              <div className='card-body'>
                <div className='d-flex justify-content-between'>
                  <h5>{contact.name}</h5>
                  <div>
                    <button
                      className='btn btn-danger btn-block'
                      onClick={() => removeFromFavorites(contact.id)}>
                      Remove
                    </button>
                  </div>
                </div>
                <h5>{contact.tel}</h5>
                <h5>{contact.email}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default FavoriteContacts;
