import createBus from './createBus';
import moment from 'moment';

/**
 * Checks if: rangeUpper - 1 min < inp < rangeUpper
 *
 * @param inp {string} 'Thu Mar 31 2016 11:00:00 GMT+0800 (SGT)'
 * @param rangeUpper {string}
 * @returns {boolean}
 */
function timeInRange(inp, rangeUpper) {
  // todo new Date() is not consistent across browsers https://github.com/moment/moment/issues/1407
  const START = moment(new Date(rangeUpper)).subtract(1, 'm');
  const end = moment(new Date(rangeUpper));
  return moment(new Date(inp)).isBetween(START, end);
}

function createController(map, data) {
  const controllerPrototype = {
    updateTime(newTime) {
      this.removeAll();
      this.data.forEach(data => {
        if (!timeInRange(data.date, newTime)) {
          return;
        }

        this.buses.push(createBus(map, [data.lat, data.lng]));
      });
    },

    removeAll() {
      this.buses.forEach(element => {
        element.remove();
      });
      this.buses = [];
    }
  };
  
  const controller = Object.create(controllerPrototype);
  
  const controllerProps = {
    data,
    buses: []
  };

  return Object.assign(controller, controllerProps);
}

export default createController;
