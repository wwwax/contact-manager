import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { db } from '../firebase';
import 'react-toastify/dist/ReactToastify.css';

const EditContact = () => {
  const initialContactState = {
    name: '',
    tel: '',
    email: '',
  };
  const [contact, setContact] = useState({ ...initialContactState });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const getSelectedContact = async () => {
    const querySnapshot = await db.collection('contact-edit').get();
    querySnapshot.forEach((doc) => {
      setContact({ ...doc.data(), marker: doc.id });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, marker } = contact;
    try {
      await db.collection('contacts').doc(id).update(contact);
      await db.collection('contact-edit').doc(marker).delete();
      setContact({ ...initialContactState });
      toast('Link Updated Successfully', {
        type: 'success',
        autoClose: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSelectedContact();
  }, []);

  return (
    <>
      <div className='row'>
        <div className='col-md-12 p-2'>
          <form className='card card-body' onSubmit={handleSubmit}>
            <div className='form-group input-group'>
              <div className='input-group-text bg-light'>
                <i className='material-icons'>person</i>
              </div>
              <input
                className='form-control'
                type='text'
                placeholder='Name'
                name='name'
                value={contact.name}
                required
                onChange={handleInputChange}
              />
            </div>

            <div className='form-group input-group'>
              <div className='input-group-text bg-light'>
                <i className='material-icons'>phone</i>
              </div>
              <input
                className='form-control'
                type='text'
                placeholder='Tel'
                name='tel'
                value={contact.tel}
                required
                onChange={handleInputChange}
              />
            </div>

            <div className='form-group input-group'>
              <div className='input-group-text bg-light'>
                <i className='material-icons'>email</i>
              </div>
              <input
                className='form-control'
                type='text'
                placeholder='Email'
                name='email'
                value={contact.email}
                required
                onChange={handleInputChange}
              />
            </div>

            <button className='btn btn-success btn-block'>Update</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditContact;
