import React from 'react';
import ReactDOM from 'react-dom/client';
import App  from 'components/App.jsx';
import {GlobalStyle} from './index.styled.jsx';
import 'react-toastify/dist/ReactToastify.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
