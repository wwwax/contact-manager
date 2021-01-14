import React, { useState, useEffect } from 'react';
import { db } from '../firebase';

const ContactForm = ({ addContact, editContact, idForEdit }) => {
  const initialContactState = {
    name: '',
    phone: '',
    email: '',
  };

  const [contact, setContact] = useState({ ...initialContactState });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const validateEmail = (str) => {
    console.log(str);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateEmail('validating email...');
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
          placeholder='phone'
          name='phone'
          value={contact.phone}
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
