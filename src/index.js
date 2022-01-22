import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Ant Design Styles
import 'antd/dist/antd.css';

// Bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css';

// Firebase connection
import './firebase.js';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
