import moment from 'moment';
import createMap from './createMap';
import createController from './createController';
import test from './testBus';
import reducer from './reducers';
import {createStore} from 'redux';
import {changeTime} from './actions';
const bus2data = BUS_2_DATA;
const busStops = BUS_STOPS;
import { Provider } from 'react-redux';
import React from 'react';
import { render } from 'react-dom';
import App from './components/app';


const store = createStore(reducer);
const map = createMap();
test(map);

const controller = createController(map, bus2data);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

store.subscribe(() => {
  const newState = store.getState();
  controller.updateTime(newState.date);
});


let counter = 0;
setInterval(() => {
  const newTime = moment(new Date('Thu Mar 31 2016 11:00:00 GMT+0800 (SGT)')).add(counter, 'm');
  store.dispatch(changeTime(newTime));
  counter += 1
}, 1000);
