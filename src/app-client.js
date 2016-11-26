// src/app-client.js
import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/AppRoutes.jsx';

window.onload = () => {
  ReactDOM.render(<AppRoutes/>, document.getElementById('main'));
};