import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'

import store, { history } from './store.js'
import Router from './routes/Router.js'



const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
          <Router />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
