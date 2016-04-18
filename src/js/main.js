import React from 'react';
import createMap from './createMap';
import createController from './createController';
import reducer from './reducers';
import {createStore} from 'redux';
import {stepTime} from './actions';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import App from './components/app';
import interpolate from './interpolation';
import {bus2Data, busStops} from './data';

const interpolatedBus2Data = interpolate(bus2Data, busStops);

const STEP_MINUTES = 1;

const store = createStore(reducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

const map = createMap();
const controller = createController(map, interpolatedBus2Data);

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
