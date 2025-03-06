import React from 'react';
import ReactDOM from 'react-dom/client';
import '../css/index.css';
import App from './app';
import 'admin-lte/dist/js/adminlte.min.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);