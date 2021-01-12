import React from 'react';

const UserForm = () => {
  return (
    <form className='card card-body'>
      <div className='form-group input-group'>
        <div className='input-group-text bg-light'>
          <i className='material-icons'>person</i>
        </div>
        <input className='form-control' type='text' placeholder='name' name='name' />
      </div>

      <div className='form-group input-group'>
        <div className='input-group-text bg-light'>
          <i className='material-icons'>phone</i>
        </div>
        <input className='form-control' type='text' placeholder='phone' name='phone' />
      </div>

      <div className='form-group input-group'>
        <div className='input-group-text bg-light'>
          <i className='material-icons'>email</i>
        </div>
        <input className='form-control' type='text' placeholder='email' name='email' />
      </div>

      <button className='btn btn-primary btn-block'>save</button>
    </form>
  );
};

export default UserForm;

// name, phone, email
// edit, delete, add to favorites
