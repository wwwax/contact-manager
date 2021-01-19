import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { db } from '../firebase';
import 'react-toastify/dist/ReactToastify.css';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    try {
      db.collection('contacts').onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setContacts(docs);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContact = async ({ id, name }) => {
    try {
      await db.collection('contacts').doc(id).delete();
      toast(`Contact ${name} Removed`, {
        type: 'success',
        autoClose: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFavorites = async (contact) => {
    try {
      await db
        .collection('contacts')
        .doc(contact.id)
        .update({ ...contact, favorite: !contact.favorite });
      toast(
        !contact.favorite
          ? 'Contact Added To Favorites'
          : 'Contact Removed From Favorites',
        {
          type: 'success',
          autoClose: 1500,
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getContactForEdit = async (contact) => {
    try {
      await db.collection('contact-edit').doc().set(contact);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <>
      <div className='row'>
        <div className='col-md-12 p-2'>
          <h3 className='text-center p-4'>Contacts</h3>
          <Link className='btn btn-success btn-block mb-4' to='/add'>
            Add Contact
          </Link>

          {contacts.map((contact) => (
            <div className='card mb-2' key={contact.id}>
              <div className='card-body'>
                <div className='d-flex justify-content-between'>
                  <div>
                    <h5 className='text-success'>{contact.name}</h5>
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
                      style={{ cursor: 'pointer' }}
                      onClick={() => toggleFavorites(contact)}>
                      star
                    </i>

                    <Link to='/edit'>
                      <i
                        className='material-icons text-white'
                        onClick={() => {
                          getContactForEdit(contact);
                        }}>
                        edit
                      </i>
                    </Link>

                    <i
                      style={{ cursor: 'pointer' }}
                      className='material-icons'
                      onClick={() => deleteContact(contact)}>
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
