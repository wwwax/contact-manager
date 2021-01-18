import React from 'react';

const Login = ({ onLogin }) => {
  return (
    <div className='row d-flex justify-content-center'>
      <div className='col-md-4'>
        <div className='card card-body'>
          <h2 className='mb-4 text-center'>Contact Manager</h2>
          <button className='btn btn-success btn-lg' onClick={onLogin}>
            Login With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
