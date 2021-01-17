import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

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
      autoClose: 2000,
    });
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div>
      <div className='row'>
        <div className='col-md-12 p-4'>
          {contacts.map((contact) => (
            <div className='card mb-1' key={contact.id}>
              <div className='card-body'>
                <div className='d-flex justify-content-between'>
                  <h5>{contact.name}</h5>
                  <div>
                    <i
                      className='material-icons text-danger'
                      onClick={() => removeFromFavorites(contact.id)}>
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
      </div>
      <ToastContainer />
    </div>
  );
};

export default FavoriteContacts;
