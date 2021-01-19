import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { db } from '../firebase';
import 'react-toastify/dist/ReactToastify.css';

const AddContact = () => {
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

  const validateEmail = (str) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(str).toLowerCase());
  };

  const validateTelNumber = (telNumber) => {
    const re = /^\d+$/;
    return re.test(telNumber);
  };

  const addContact = async (contact) => {
    try {
      await db.collection('contacts').doc().set(contact);
      toast('Contact Added', {
        type: 'success',
        autoClose: 1500,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateTelNumber(contact.tel)) {
      return toast('Invalid Telephone Number', {
        type: 'error',
        autoClose: 1500,
      });
    }

    if (!validateEmail(contact.email)) {
      return toast('Invalid Email', {
        type: 'error',
        autoClose: 1500,
      });
    }

    addContact({ ...contact, favorite: false });
    setContact({ ...initialContactState });
  };

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

            <button className='btn btn-success btn-block'>Add</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddContact;
