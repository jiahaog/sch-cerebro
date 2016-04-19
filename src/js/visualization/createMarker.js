import leaflet from 'leaflet';
import eachSeries from 'async/eachSeries';
import {Actor, Tween} from 'popmotion';

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
      const routeParts = route.subrouteWithTiming([currentLocation.lat, currentLocation.lng], nextLocation);

      eachSeries(routeParts, (element, callback) => {
        const point = element.location;
        const timing = element.duration;
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
