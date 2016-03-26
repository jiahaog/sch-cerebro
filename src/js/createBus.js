import zip from 'lodash/zip';
import leaflet from 'leaflet';

const FPS = 60;

/**
 * @param {leaflet.marker} marker
 * @param {Array} location
 * @param duration seconds
 */
function moveToLocation(marker, location, duration = 1) {
  const current = marker.getLatLng();

  const currentArray = [current.lat, current.lng];

  const frames = duration * FPS;
  const inBetween = getInBetween(currentArray, location, frames);

  inBetween.forEach((loc, index) => {
    setTimeout(() => {
      marker.setLatLng(loc);
    }, duration / frames * index * 1000);
  });
}

function getInBetween(start, end, frames = 60) {
  const final = [[], []];
  start.forEach((element, index) => {
    const distance = end[index] - start[index];
    const unit = distance / frames;
    for (let i = 1; i < frames + 1; i++) {
      final[index].push(start[index] + unit * i);
    }
  });
  return zip(final[0], final[1]);
}

function createBus(map, location) {
  const marker = leaflet.circleMarker(location, {
    radius: 4,
    stroke: false,
    fillColor: '#ffffff',
    fillOpacity: 1
  }).addTo(map);

  return {
    marker,
    move(location) {
      moveToLocation(marker, location);
    }
  }
}

export default createBus;
