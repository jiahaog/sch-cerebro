import moment from 'moment';
import createMap from './createMap';
import createController from './createController';
import test from './testBus';
const bus2data = BUS_2_DATA;
const busStops = BUS_STOPS;

const map = createMap();
test(map);

const controller = createController(map, bus2data);

let counter = 0;
setInterval(() => {
  const newTime = moment(new Date('Thu Mar 31 2016 11:00:00 GMT+0800 (SGT)')).add(counter, 'm');
  controller.updateTime(newTime);
  counter += 1;
}, 1000);
