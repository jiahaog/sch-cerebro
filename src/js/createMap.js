
import leaflet from 'leaflet';



leaflet.Icon.Default.imagePath = 'img';

function createMap() {
  const container = document.getElementById('mapid');

  const map = leaflet.map(container, {
    center: [1.290270, 103.851959],
    zoom: 13
  });

  const OSM_URL = 'https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png';
  const OSM_ATTR = 'Maps © <a href="http://www.thunderforest.com">Thunderforest</a>, Data © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>';
  leaflet.tileLayer(OSM_URL, {maxZoom: 18, attribution: OSM_ATTR}).addTo(map);
  return map
}

export default createMap;
