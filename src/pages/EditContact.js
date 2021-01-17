import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { db } from '../firebase';
import 'react-toastify/dist/ReactToastify.css';

const EditContact = () => {
  const initialContactState = { name: '', tel: '', email: '' };
  const [contact, setContact] = useState({ ...initialContactState });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const getSelectedContact = async () => {
    const arr = [];
    const querySnapshot = await db.collection('contact-for-edit-test-10').get();
    querySnapshot.forEach((doc) => {
      arr.push({ ...doc.data(), id: doc.id });
    });
    setContact(arr[0]);
  };

  console.log('from edit =>', contact);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const marker = contact.marker;
    console.log('fddfds =>', contact);

    await db.collection('contacts').doc(marker).update(contact);
    await db.collection('contacts-for-edit-test-10').doc(contact.id).delete();
    setContact({ ...initialContactState });
    toast('Link Updated Successfully', {
      type: 'success',
      autoClose: 1500,
    });
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

            <button className='btn btn-primary btn-block'>Update</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditContact;
