import moment from 'moment';
import createMap from './createMap';
import createController from './createController';
import test from './testBus';
import store from './state/store';
import {changeTime} from './state/action';
const bus2data = BUS_2_DATA;
const busStops = BUS_STOPS;

const map = createMap();
test(map);

const controller = createController(map, bus2data);

// let counter = 0;
// setInterval(() => {
//   const newTime = moment(new Date('Thu Mar 31 2016 11:00:00 GMT+0800 (SGT)')).add(counter, 'm');
//   controller.updateTime(newTime);
//   counter += 1;
// }, 1000);


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
