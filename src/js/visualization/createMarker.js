import leaflet from 'leaflet';
import {Actor, Tween} from 'popmotion';

const MARKER_APPEARANCE = {
  strokeColor: '#2ca25f',
  strokeWeight: 3,
  fillColor: '#e5f5f9',
  radius: 6
};

function createMarker(map, location, title) {
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
    move(location) {
      marker.setStyle({
        fillOpacity: 1,
        opacity: 1
      });
      const tween = new Tween({
        values: {
          lat: location[0],
          lng: location[1]
        },
        duration: 1000,
        ease: 'linear'
      });
      actor.start(tween);
    },
    remove() {
      this.removed = true;
      map.removeLayer(marker);
    }
  }
}

export default createMarker;
