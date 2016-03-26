import createMap from './createMap';
import createBus from './createBus';
import test from './testBus';
const map = createMap();

const testLocation = [1.290270, 103.851959];

const testBus = createBus(map, testLocation);

setTimeout(() => {
  testBus.move([1.290270, 103.9]);
}, 2000);

test(map);
