import createMap from './createMap';
import createController from './createController';
import {stepTimeForward} from './../actions';
import interpolate from './../interpolation';
import {bus2Data, busStops} from './../data';

const STEP_MINUTES = 1;

function visualization(store) {
  const interpolatedBus2Data = interpolate(bus2Data, busStops);

  const map = createMap();

  const startTime = store.getState().date;

  const controller = createController(map, interpolatedBus2Data);
  controller.updateTime(startTime);
  
  let interval;
  store.subscribe(() => {
    const newState = store.getState();
    controller.updateTime(newState.date);

    if (newState.isPlayingBack) {

      if (interval) {
        return;
      }

      interval = setInterval(() => {
        store.dispatch(stepTimeForward());
      }, STEP_MINUTES * 1000);
    } else {
      clearInterval(interval);
      interval = null;
    }
  });
}

export default visualization;
