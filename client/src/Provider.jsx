import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'; // The purpose of Provider is to "provide" the store to its child components.
import { createStore } from 'redux'; // This will hold the entire state of our app.
import rootReducer from './reducers/combineReducer.jsx'; // This file combines all of our mini reducer functions.
import App from './components/app.jsx';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('app')
);

/*------------- DONE -------------*/