import moment from 'moment';
import createMarker from './createMarker';
import _ from 'lodash';

/**
 * Checks if: rangeUpper - 1 min < inp < rangeUpper
 *
 * @param inp {string} 'Thu Mar 31 2016 11:00:00 GMT+0800 (SGT)'
 * @param checkRange {string}
 * @returns {boolean}
 */
function timeInRange(inp, checkRange) {
  // todo new Date() is not consistent across browsers https://github.com/moment/moment/issues/1407
  const start = moment(new Date(checkRange)).subtract(0.5, 'm');
  const end = moment(new Date(checkRange)).add(0.5, 'm');
  return moment(new Date(inp)).isBetween(start, end);
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
          this.marker = null;
          return;
        }
        return;
      }

      const locationArray = [correspondingFrame.lat, correspondingFrame.lng];

      if (this.marker) {
        this.marker.move(locationArray);
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
