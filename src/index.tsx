import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'assets/css/reset.css'
import 'assets/css/base.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
