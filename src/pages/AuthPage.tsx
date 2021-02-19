import React from 'react';

interface AuthPageProps {
  onLogin(): void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  return (
    <div className='container p-4'>
      <div className='row d-flex justify-content-center'>
        <div className='col-md-4'>
          <div className='card card-body'>
            <h2 className='mb-4 text-center'>Contact Manager</h2>
            <button className='btn btn-success btn-block' onClick={onLogin}>
              Login With Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
