import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ContactsPage from './pages/ContactsPage';
import FavoritesPage from './pages/FavoritesPage';
import AuthPage from './pages/AuthPage';
import Nav from './components/Nav';
import firebase from 'firebase';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

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
            <Route path='/' component={ContactsPage} exact />
            <Route path='/favorites' component={FavoritesPage} />
          </Switch>
        </Router>

        <ToastContainer />
      </div>
    );
  } else {
    return <AuthPage onLogin={onLogin} />;
  }
};

export default App;
