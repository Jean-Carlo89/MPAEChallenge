import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App"

import {createStore} from "redux"
import allReducers from "./Redux/reducers/index"
import {Provider} from "react-redux"

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
 )

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


