import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { db } from '../firebase';
import 'react-toastify/dist/ReactToastify.css';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    db.collection('contacts').onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setContacts(docs);
    });
  };

  const deleteContact = async (id) => {
    await db.collection('contacts').doc(id).delete();
    toast('Contact Removed', {
      type: 'error',
      autoClose: 1500,
    });
  };

  const addToFavorites = async (contact) => {
    await db.collection('favorite-contacts').doc().set(contact);
    toast('Contact Added To Favorites', {
      type: 'success',
      autoClose: 1500,
    });
  };

  const getContactForEdit = async (contact) => {
    await db.collection('contact-edit').doc().set(contact);
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <>
      <div className='row'>
        <div className='col-md-12 p-2'>
          <Link className='btn btn-success btn-block mb-4' to='/add'>
            Add Contact
          </Link>

          {contacts.map((contact) => (
            <div className='card mb-2' key={contact.id}>
              <div className='card-body'>
                <div className='d-flex justify-content-between'>
                  <div>
                    <h5>{contact.name}</h5>
                    <h5>{contact.tel}</h5>
                    <h5>{contact.email}</h5>
                  </div>
                  <div>
                    <button
                      className='btn btn-info btn-block'
                      onClick={() => addToFavorites(contact)}>
                      Favorites
                    </button>
                    <Link
                      className='btn btn-warning btn-block'
                      to='/edit'
                      onClick={() => {
                        getContactForEdit(contact);
                      }}>
                      Edit
                    </Link>
                    <button
                      className='btn btn-danger btn-block'
                      onClick={() => deleteContact(contact.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Contacts;
