import eachSeries from 'async/eachSeries';
import {latLngToGeoJsonObject, latLngToGeoJsonPoint} from './../helpers'
import {Actor, Tween} from 'popmotion';

const MARKER_APPEARANCE = {
  strokeColor: '#2ca25f',
  strokeWeight: 3,
  fillColor: '#4CAF50',
  radius: 8
};

function createMarker(map, location, id) {

  const sourceId = `busSource${id}`;
  const layerId = `busId${id}`;
  map.addSource(sourceId, latLngToGeoJsonObject(location));

  map.addLayer({
    id: layerId,
    source: sourceId,
    type: 'circle',
    layout: {
      visibility: 'none'
    },
    paint: {
      'circle-radius': MARKER_APPEARANCE.radius,
      'circle-color': MARKER_APPEARANCE.fillColor,
      'circle-opacity': 0.7
    }
  });

  let removed = false;

  const actor = new Actor({
    values: {
      lat: location[0],
      lng: location[1]
    },
    onUpdate(output) {
      if (removed) {
        // prevents undefined errors if the layer has been removed
        return;
      }
      const latLngToUpdate = [output.lat, output.lng];
      map.getSource(sourceId).setData(latLngToGeoJsonPoint(latLngToUpdate))
    }
  });

  const prototype = {
    move(nextLocation) {
      if (removed) {
        return;
      }
      map.setLayoutProperty(layerId, 'visibility', 'visible');

      const tween = new Tween({
        values: {
          lat: nextLocation[0],
          lng: nextLocation[1]
        },
        duration: 1000,
        ease: 'linear'
      });
      actor.start(tween);

      // const currentLocation = marker.getLatLng();
      // const routeParts = route.subrouteWithTiming([currentLocation.lat, currentLocation.lng], nextLocation);
      //
      // eachSeries(routeParts, (element, callback) => {
      //   const point = element.location;
      //   const timing = element.duration;
      //   const tween = new Tween({
      //     values: {
      //       lat: point[0],
      //       lng: point[1]
      //     },
      //     duration: timing,
      //     ease: 'linear'
      //   });
      //   tween.onComplete = () => {
      //     callback();
      //   };
      //   actor.start(tween);
      // });
    },

    remove() {
      map.removeLayer(layerId);
      map.removeSource(sourceId);
      removed = true;
    }
  };

  return Object.create(prototype);
}

export default createMarker;
