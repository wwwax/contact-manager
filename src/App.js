import React from 'react';
import { ToastContainer } from 'react-toastify';
import Contacts from './components/Contacts';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='container p-4'>
      <div className='row'>
        <Contacts />
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;

// app pages: auth, contacts, favorites
// contact values: name, phone, email
// card buttons: edit, delete, add to favorites
