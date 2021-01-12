import React from 'react';
import UserForm from './components/UserForm';
import Users from './components/Users';

const App = () => {
  return (
    <div className='container p-4'>
      <div className='row'>
        <UserForm />
        <Users />
      </div>
    </div>
  );
};

export default App;
