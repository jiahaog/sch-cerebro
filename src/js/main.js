import createMap from './createMap';
import createBus from './createBus';
import moment from 'moment';
import test from './testBus';
const map = createMap();
const bus2data = BUS_2_DATA;
const busStops = BUS_STOPS;

test(map);

let counter = 0;

let buses = [];
setInterval(() => {
  counter += 1;

  buses.forEach(element => {
    element.remove();
  });
  buses = [];
  let appear = 0;
  bus2data.forEach(element => {
    if (!timeInRange(element.date, counter)) {
      return;
    }
    buses.push(createBus(map, [element.lat, element.lng]));
    appear += 1;
    // plot these
  });
}, 2000);


busStops.forEach(busStop => {
  createBus(map, [busStop.lat, busStop.lng], '#FF0000');
});

function timeInRange(inp, n) {
  // todo new Date() is not consistent across browsers https://github.com/moment/moment/issues/1407
  const START = moment(new Date('Thu Mar 31 2016 11:00:00 GMT+0800 (SGT)')).add(n, 'm');
  const end = moment(new Date('Thu Mar 31 2016 11:00:00 GMT+0800 (SGT)')).add(n+1, 'm');
  return moment(new Date(inp)).isBetween(START, end);
}
