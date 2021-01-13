import React, { useState } from 'react';

const ContactForm = ({ addContact }) => {
  const initialContactState = {
    name: '',
    phone: '',
    email: '',
  };

  const [contact, setContact] = useState(initialContactState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addContact(contact);
    setContact(initialContactState);
  };

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

      <button className='btn btn-primary btn-block'>save</button>
    </form>
  );
};

export default ContactForm;
