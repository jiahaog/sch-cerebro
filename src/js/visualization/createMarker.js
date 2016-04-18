import leaflet from 'leaflet';
import {Actor, Tween} from 'popmotion';

function createMarker(map, location, title, color='#000000') {
  const marker = leaflet.circleMarker(location, {
    radius: 4,
    stroke: false,
    fillColor: color,
    fillOpacity: 0,
    title,

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
        fillOpacity: 1
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
