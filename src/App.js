import React from 'react';
// import { Route, BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Contacts from './components/Contacts';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ onLogout }) => {
  return (
    <>
      <div className='row'>
        <Contacts onLogout={onLogout} />
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
