import {bus2Line} from './../data';
import geolib from 'geolib';
import findIndex from 'lodash/findIndex';
import zip from 'lodash/zip';
import union from 'lodash/union';
import memoize from 'lodash/memoize';
import {TIME_STEP_MINUTES, ROUTE_SEARCH_THRESHOLD} from './../config';

function calculateRouteTimings(routeParts, totalDuration) {

  // if there's only one element, the first element of the timings should simply be the
  // total duration
  if (routeParts.length === 1) {
    return [totalDuration];
  }

  const distances = routeParts.map((currentLocation, index) => {
    // shift the marker to the first point immediately
    if (index === 0) {
      return 0;
    }
    const previousLocation = routeParts[index - 1];

    return geolib.getDistance(
      {latitude: currentLocation[0], longitude: currentLocation[1]},
      {latitude: previousLocation[0], longitude: previousLocation[1]}
    );
  });

  const totalDistance = distances.reduce((previousValue, currentValue) => {
    return previousValue + currentValue
  }, 0);

  return distances.map(distance => {
    return totalDuration / totalDistance * distance
  });
}

function createRoute() {
  const prototype = {
    subroute(start,end) {
      // assumes that this.data route is provided in order of the route

      const indexes = [start, end].map(referenceLocation => {
        return findIndex(this.routePoints, searchLocation => {
          const distanceFromSearch =  geolib.getDistance(
              {latitude: referenceLocation[0], longitude: referenceLocation[1]},
              {latitude: searchLocation[0], longitude: searchLocation[1]}
            );
          return distanceFromSearch < ROUTE_SEARCH_THRESHOLD;
        });
      });

      
      if (indexes[0] > indexes[1]) {
        indexes.reverse();
      }
      // add one to be inclusive
      return this.routePoints.slice(indexes[0], indexes[1] + 1);
    },
    _subrouteWithTiming(start, end) {
      const subroute = this.subroute(start, end);
      const timings = calculateRouteTimings(subroute, TIME_STEP_MINUTES * 1000);
      return zip(subroute, timings).map(element => {
        return {
          location: element[0],
          duration: element[1]
        }
      });
    },
    
    subrouteWithTiming(start, end) {
      return memoize(this._subrouteWithTiming).call(this, start, end);
    },
    
    draw(map) {
      const lines = zip(bus2Line, ['#E91E63', '#2196F3']);
      lines.forEach(([route, color], index) => {
        map.addSource(`routeSource${index}`, {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: route
            }
          }
        });

        map.addLayer({
          id: `routeId${index}`,
          type: 'line',
          source: `routeSource${index}`,
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': color,
            'line-width': 8,
            'line-opacity': 0.3
          }
        });
      });
    }
  };

  const instance = Object.create(prototype);
  const instanceProps = {
    routePoints: union(bus2Line[0], bus2Line[1])
  };
  return Object.assign(instance, instanceProps);
}

export default createRoute;
