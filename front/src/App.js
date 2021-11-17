import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'

import store, { history } from './store.js'
import RouterPage from './routes/RouterPage.js'



const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
       
          <RouterPage />
 
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
