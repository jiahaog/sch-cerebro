export function latLngToGeoJsonObject(latLng) {
  return {
    type: 'geojson',
    data: latLngToGeoJsonPoint(latLng)
  }
}

export function latLngToGeoJsonPoint(latLng) {
  return {
    type: 'Point',
    coordinates: [
      latLng[1],
      latLng[0]
    ]
  }
}
