import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import loadUser from './components/auth/loadUser';



// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

loadUser()



const element = (

    <Router>
      <App />
    </Router>
  );

ReactDOM.render(element, document.getElementById('root'));

