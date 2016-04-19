import leaflet from 'leaflet';
import eachSeries from 'async/eachSeries';
import {Actor, Tween} from 'popmotion';
import zip from 'lodash/zip';

const MARKER_APPEARANCE = {
  strokeColor: '#2ca25f',
  strokeWeight: 3,
  fillColor: '#e5f5f9',
  radius: 6
};

function createMarker(map, location, title, route) {
  const marker = leaflet.circleMarker(location, {
    radius: MARKER_APPEARANCE.radius,
    color: MARKER_APPEARANCE.strokeColor,
    weight: MARKER_APPEARANCE.strokeWeight,
    opacity: 0,
    fillColor: MARKER_APPEARANCE.fillColor,
    fillOpacity: 0
  }).addTo(map);

  marker.bindPopup(title);

  const actor = new Actor({
    values: {
      lat: location[0],
      lng: location[1]
    },
    onUpdate(output) {
      marker.setLatLng([output.lat, output.lng]);
    }
  });

  return {
    marker,
    actor,
    move(nextLocation) {
      marker.setStyle({
        fillOpacity: 1,
        opacity: 1
      });

      const currentLocation = marker.getLatLng();
      const routeParts = route.subroute([currentLocation.lat, currentLocation.lng], nextLocation);
      const routeTimings = calculateRouteTimings(routeParts, 1000);

      eachSeries(zip(routeParts, routeTimings), (element, callback) => {
        const point = element[0];
        const timing = element[1];
        const tween = new Tween({
          values: {
            lat: point[0],
            lng: point[1]
          },
          duration: timing,
          ease: 'linear'
        });
        tween.onComplete = () => {
          callback();
        };
        actor.start(tween);
      });
    },

    remove() {
      map.removeLayer(marker);
    }
  }
}

export default createMarker;


import geolib from 'geolib';
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
