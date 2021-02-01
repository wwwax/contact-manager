import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Nav from './components/Nav';
import Login from './pages/Login';
import Contacts from './pages/Contacts';
import FavoriteContacts from './pages/FavoriteContacts';
import firebase from 'firebase';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  const onLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  const onLogout = () => {
    firebase.auth().signOut();
    setIsLogin(false);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
      }
    });
  }, []);

  if (isLogin) {
    return (
      <div className='container p-4'>
        <Router>
          <Nav onLogout={onLogout} />
          <Switch>
            <Route path='/' exact component={Contacts} />
            <Route path='/favorites' component={FavoriteContacts} />
          </Switch>
        </Router>

        <ToastContainer />
      </div>
    );
  } else {
    return <Login onLogin={onLogin} />;
  }
};

export default App;
