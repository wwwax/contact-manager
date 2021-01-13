import React from 'react';
import Contacts from './components/Contacts';

const App = () => {
  return (
    <div className='container p-4'>
      <div className='row'>
        <Contacts />
      </div>
    </div>
  );
};

export default App;

// app pages: auth, contacts, favorites
// contact values: name, phone, email
// card buttons: edit, delete, add to favorites
