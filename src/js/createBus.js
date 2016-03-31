import leaflet from 'leaflet';
import {Actor, Tween} from 'popmotion';

function createBus(map, location, color='#ffffff') {
  const marker = leaflet.circleMarker(location, {
    radius: 4,
    stroke: false,
    fillColor: color,
    fillOpacity: 1
  }).addTo(map);


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
      const tween = new Tween({
        values: {
          lat: location[0],
          lng: location[1]
        },
        duration: 10,
        ease: 'linear'
      });
      actor.start(tween);
    },
    remove() {
      map.removeLayer(marker);
    }
  }
}

export default createBus;
