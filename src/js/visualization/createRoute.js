import {bus2Route} from './../data';
import geolib from 'geolib';
import findIndex from 'lodash/findIndex';
import memoize from 'lodash/memoize';

const SEARCH_DISTANCE_THRESHOLD = 100;

function createRoute() {
  const prototype = {
    _subroute(start,end) {
      // assumes that this.data route is provided in order of the route

      const indexes = [start, end].map(referenceLocation => {
        return findIndex(this.data, searchLocation => {
          const distanceFromSearch =  geolib.getDistance(
              {latitude: referenceLocation[0], longitude: referenceLocation[1]},
              {latitude: searchLocation[0], longitude: searchLocation[1]}
            );
          return distanceFromSearch < SEARCH_DISTANCE_THRESHOLD;
        });
      });

      
      if (indexes[0] > indexes[1]) {
        indexes.reverse();
      }
      // add one to be inclusive
      return this.data.slice(indexes[0], indexes[1] + 1);
    },
    subroute(start, end) {
      return memoize(this._subroute).call(this, start, end);
    }
  };

  const instance = Object.create(prototype);
  const instanceProps = {
    data: bus2Route
  };
  return Object.assign(instance, instanceProps);
}

export default createRoute;
