// import leaflet from 'leaflet';
import mapbox from 'mapbox-gl';

function createMap() {
  // const container = document.getElementById('mapid');
  //
  // const map = leaflet.map(container, {
  //   center: [1.290270, 103.851959],
  //   zoom: 13
  // });
  //
  // const MAPBOX_TOKEN = 'pk.eyJ1IjoiamlhaGFvZyIsImEiOiJjaW02am8wYzAwMmQzdWJtNDkxZ2loY3h4In0.bQweoZxjHwlmx9cZXVQJAA';
  // const OSM_URL = `https://api.mapbox.com/styles/v1/mapbox/light-v8/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`;
  // const OSM_ATTR = `© <a href='https://www.mapbox.com/map-feedback/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>`;
  // leaflet.tileLayer(OSM_URL, {maxZoom: 18, attribution: OSM_ATTR}).addTo(map);

  
  
  return new Promise(resolve => {
    mapbox.accessToken = 'pk.eyJ1IjoiamlhaGFvZyIsImEiOiJjaW02am8wYzAwMmQzdWJtNDkxZ2loY3h4In0.bQweoZxjHwlmx9cZXVQJAA';
    const map = new mapbox.Map({
      container: document.getElementById('mapid'),
      style: 'mapbox://styles/jiahaog/cin9bczac00i0d5m3s86t0j4z',
      attributionControl: true
    });
    map.on('load', () => {
      map.flyTo({center: [103.90, 1.32], zoom: 12.3});
      resolve(map);
    });
  });
}

export default createMap;



