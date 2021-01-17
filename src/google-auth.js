import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import App from './App';
import GoogleLogin from './components/GoogleLogin';

const GoogleAuth = () => {
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

  return (
    <div className='container p-4'>
      {isLogin ? <App onLogout={onLogout} /> : <GoogleLogin onLogin={onLogin} />}
    </div>
  );
};

export default GoogleAuth;
