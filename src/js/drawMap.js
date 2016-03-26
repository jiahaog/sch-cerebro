import zip from 'lodash/zip';
import leaflet from 'leaflet';

const FPS = 60;

leaflet.Icon.Default.imagePath = 'img';

const container = document.getElementById('mapid');

const map = leaflet.map(container, {
  center: [1.290270, 103.851959],
  zoom: 13
});

const OSM_URL = 'https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png';
const OSM_ATTR = 'Maps © <a href="http://www.thunderforest.com">Thunderforest</a>, Data © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>';
leaflet.tileLayer(OSM_URL, {maxZoom: 18, attribution: OSM_ATTR}).addTo(map);
//

const marker = leaflet.circleMarker([1.290270, 103.851959], {
  radius: 5,
  stroke: false,
  fillColor: '#ffffff',
  fillOpacity: 1
}).addTo(map);

setTimeout(() => {
  moveToLocation(marker, [1.290270, 103.9]);
}, 2000);

/**
 *
 * @param {leaflet.marker} marker
 * @param {Array} location
 * @param duration seconds
 */
function moveToLocation(marker, location, duration = 10) {
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
