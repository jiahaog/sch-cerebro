import leaflet from 'leaflet';
import {Actor, Tween} from 'popmotion';

function createBus(map, location) {
  const marker = leaflet.circleMarker(location, {
    radius: 4,
    stroke: false,
    fillColor: '#ffffff',
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
        duration: 1000,
        ease: 'linear'
      });
      actor.start(tween);
    }
  }
}

export default createBus;
