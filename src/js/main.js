import React from 'react';
import reducer from './reducers';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import App from './components/app';

import createVisualization from './visualization';

const store = createStore(reducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

createVisualization(store);
