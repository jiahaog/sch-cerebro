import createBus from './createBus';

const SG_BOUNDS = [
  [1.419067, 103.693886], // top left
  [1.319532, 103.947945] // bottom right
];

function randomBus(map) {
  const randomLocation = locationInSingapore();
  // console.log(randomLocation);
  return createBus(map, randomLocation)
}

function createRandomBuses(map, number = 1000) {
  for (let i = 0; i < number; i++) {
    const bus = randomBus(map);
    setInterval(() => {
      bus.move(locationInSingapore());
    }, 1000);
  }
}

function locationInSingapore() {
  return [
    randomFromInterval(SG_BOUNDS[1][0], SG_BOUNDS[0][0]),
    randomFromInterval(SG_BOUNDS[0][1], SG_BOUNDS[1][1])
  ]
}

function randomFromInterval(min, max) {
  return Math.random() * (max - min) + min;
}

export default createRandomBuses;
