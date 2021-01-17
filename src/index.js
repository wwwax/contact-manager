import React from 'react';
import ReactDOM from 'react-dom';
import './firebase';
import GoogleLogin from './google-auth';
import 'bootswatch/dist/superhero/bootstrap.min.css';

ReactDOM.render(<GoogleLogin />, document.getElementById('root'));
