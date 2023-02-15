import React from 'react';
import ReactDOM from 'react-dom/client';
// global css

import App from './App';
// export App from App.js and import here

// ReactDom render the <App /> App => ../public/index.html => body
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
