import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { db } from '../firebase';

const ContactForm = ({ addContact, editContact, idForEdit }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateTelNumber(contact.tel)) {
      return toast('Invalid Telephone Number', {
        type: 'warning',
        autoClose: 1000,
      });
    }

    if (!validateEmail(contact.email)) {
      return toast('Invalid Email', {
        type: 'warning',
        autoClose: 1000,
      });
    }

    if (idForEdit === '') {
      addContact(contact);
    } else {
      editContact(contact);
    }
    setContact({ ...initialContactState });
  };

  const getContactById = async (id) => {
    const doc = await db.collection('contacts').doc(id).get();
    setContact({ ...doc.data() });
  };

  useEffect(() => {
    if (idForEdit === '') {
      setContact({ ...initialContactState });
    } else {
      getContactById(idForEdit);
    }
  }, [idForEdit]);

  return (
    <form className='card card-body' onSubmit={handleSubmit}>
      <div className='form-group input-group'>
        <div className='input-group-text bg-light'>
          <i className='material-icons'>person</i>
        </div>
        <input
          className='form-control'
          type='text'
          placeholder='name'
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
          placeholder='tel'
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
          placeholder='email'
          name='email'
          value={contact.email}
          required
          onChange={handleInputChange}
        />
      </div>

      <button className='btn btn-primary btn-block'>
        {idForEdit === '' ? 'add' : 'update'}
      </button>
    </form>
  );
};

export default ContactForm;
