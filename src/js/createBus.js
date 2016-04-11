import moment from 'moment';
import createMarker from './createMarker';
import _ from 'lodash';

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

function createBus(map, data) {
  const prototype = {
    updateTime(newTime) {

      // find time in range


      const correspondingFrame = _.find(this.frames, element => {
        return timeInRange(element.date, newTime);
      });

      if (!correspondingFrame) {
        if (this.marker) {
          this.marker.remove();
          return;
        }
        return;
      }

      const locationArray = [correspondingFrame.lat, correspondingFrame.lng];

      if (this.marker) {
        if (this.marker.removed) {
          this.marker = createMarker(map, locationArray, data.markerId);
        } else {
          this.marker.move(locationArray);
        }
      } else {
        this.marker = createMarker(map, locationArray, data.markerId);
      }
    }
  };

  const instance = Object.create(prototype);

  const instanceProps = {
    frames: data.frames,
    marker: null
  };

  return Object.assign(instance, instanceProps);
}

export default createBus
