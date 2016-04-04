import React from 'react';
import createMap from './createMap';
import createController from './createController';
import test from './testBus';
import reducer from './reducers';
import {createStore} from 'redux';
import {stepTime} from './actions';
const bus2data = BUS_2_DATA;
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import App from './components/app';

const STEP_MINUTES = 1;

const store = createStore(reducer);


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

const map = createMap();
const controller = createController(map, bus2data);

let interval;
store.subscribe(() => {
  const newState = store.getState();
  controller.updateTime(newState.date);

  if (newState.isPlayingBack) {

    if (interval) {
      return;
    }

    interval = setInterval(() => {
      store.dispatch(stepTime());
    }, STEP_MINUTES * 1000);
  } else {
    clearInterval(interval);
    interval = null;
  }

});
test(map);
