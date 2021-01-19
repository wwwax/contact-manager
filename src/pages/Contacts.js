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

  const toggleFavorites = async (contact) => {
    await db
      .collection('contacts')
      .doc(contact.id)
      .update({ ...contact, favorite: !contact.favorite });
    toast(
      !contact.favorite ? 'Contact Added To Favorites' : 'Contact Removed From Favorites',
      {
        type: 'info',
        autoClose: 1500,
      },
    );
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
                    <i
                      className={
                        !contact.favorite
                          ? 'material-icons'
                          : 'material-icons text-success'
                      }
                      onClick={() => toggleFavorites(contact)}>
                      star
                    </i>
                    <Link
                      className='material-icons text-white'
                      to='/edit'
                      onClick={() => {
                        getContactForEdit(contact);
                      }}>
                      edit
                    </Link>
                    <i
                      className='material-icons'
                      onClick={() => deleteContact(contact.id)}>
                      delete
                    </i>
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
