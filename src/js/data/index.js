export const bus2Data = BUS_2_DATA;
export const busStops = BUS_STOPS;

const directions = [BUS_2_DETAILS['1']['route'], BUS_2_DETAILS['2']['route']];

export const bus2Line = directions.map(route => {
  return route.map(locationString => {

    const latLong = locationString.split(',');
    return [parseFloat(latLong[0]), parseFloat(latLong[1])];
  });
});

