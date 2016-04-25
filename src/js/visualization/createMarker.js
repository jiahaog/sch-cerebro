import eachSeries from 'async/eachSeries';
import {latLngToGeoJsonObject, latLngToGeoJsonPoint} from './../helpers'
import {Actor, Tween} from 'popmotion';

const MARKER_APPEARANCE = {
  fillColor: '#8BC34A',
  strokeWeight: 3,
  strokeColor: '#FFFFFF',
  radius: 6
};

function createMarker(map, location, id, route) {
  const sourceId = `busSource${id}`;
  const layerIds = [`busId${id}`, `busGlowId${id}`];
  map.addSource(sourceId, latLngToGeoJsonObject(location));

  // stroke
  map.addLayer({
    id: layerIds[0],
    source: sourceId,
    type: 'circle',
    layout: {
      visibility: 'none'
    },
    paint: {
      'circle-radius': MARKER_APPEARANCE.radius + MARKER_APPEARANCE.strokeWeight,
      'circle-color': MARKER_APPEARANCE.strokeColor
    }
  });

  // fill
  map.addLayer({
    "id": layerIds[1],
    "type": "circle",
    "source": sourceId,
    layout: {
      visibility: 'none'
    },
    "paint": {
      'circle-radius': MARKER_APPEARANCE.radius,
      'circle-color': MARKER_APPEARANCE.fillColor
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

      layerIds.forEach(layerId => {
        map.setLayoutProperty(layerId, 'visibility', 'visible');
      });

      const tween = new Tween({
        values: {
          lat: nextLocation[0],
          lng: nextLocation[1]
        },
        duration: 1000,
        ease: 'easeInOut'
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
      layerIds.forEach(layerId => {
        map.removeLayer(layerId);
      });
      map.removeSource(sourceId);
      removed = true;
    }
  };

  return Object.create(prototype);
}

export default createMarker;
