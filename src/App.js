import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Contacts from './components/Contacts';
import FavoriteContacts from './pages/FavoriteContacts';

const App = ({ onLogout }) => {
  return (
    <Router>
      <Nav onLogout={onLogout} />
      <Switch>
        <Route path='/favorites' component={FavoriteContacts} />
        <Route path='/' component={Contacts} />
      </Switch>
    </Router>
  );
};

export default App;
