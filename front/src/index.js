import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import loadUser from './components/auth/loadUser';


loadUser()

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const element = (
    <Router>
      <App />
    </Router>
  );

ReactDOM.render(element, document.getElementById('root'));

