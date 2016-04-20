import moment from 'moment';
import _ from 'lodash';
import {START_DATE, END_DATE, TIME_STEP_MINUTES} from './../config';

const startDate = new Date(START_DATE);
const endDate = new Date(END_DATE);

function timeInRange(inp, lower, upper) {
  return moment(new Date(inp)).isBetween(moment(lower), moment(upper));
}

let idCounter = 0;
function generateId() {
  idCounter += 1;

  return idCounter.toString();

  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function filterDataInDateRange(dataSet, timeRange) {
  return dataSet.filter(element => {
    return timeInRange(element.date, timeRange.start, timeRange.end);
  });
}

function dataByBusStop(dataSet) {
  const busStops = {};

  dataSet.forEach(element => {
    const currentBusStopCode = element.busStopCode;
    if (!busStops[currentBusStopCode]) {
      busStops[currentBusStopCode] = [];
    }

    busStops[currentBusStopCode].push(element);
  });

  return busStops;
}

function dataByMarker(dataSet) {
  const groupedByMarker = {};
  dataSet.forEach(data => {
    if (!groupedByMarker[data.markerId]) {
      groupedByMarker[data.markerId] = {
        // markerId: data.markerId.slice(0, 5), // truncate id
        markerId: data.markerId,
        serviceNo: data.ServiceNo,
        busStopCode: data.busStopCode,
        frames: []
      };
    }

    groupedByMarker[data.markerId].frames.push({
      date: data.date,
      lat: data.Latitude,
      lng: data.Longitude
    });
  });

  const result =  _.toArray(groupedByMarker);

  return result.filter(marker => {
    return marker.frames.length > 1;
  });
}

function assignMarkerId(element, id) {
  element.markerId = id;
}

function sortByDistance(dataSet) {
  return dataSet.sort((a, b) => {
    return a.distance - b.distance;
  });
}

function getAllBusStopCodes(dataSet) {
  const busStopCodes = [];
  dataSet.forEach(element => {
    if (busStopCodes.includes(element.busStopCode)) {
      return;
    }
    busStopCodes.push(element.busStopCode);
  });
  return busStopCodes;
}

function createNewMarkerReachedStop(sourceData, arrivalDate, busStopLocations) {
  // todo might wanna use busData.EstimatedArrival instead
  const busStopCode = sourceData.busStopCode;
  return Object.assign({}, sourceData, {
    date: arrivalDate.toISOString(),
    Latitude: busStopLocations[busStopCode].lat,
    Longitude: busStopLocations[busStopCode].lng
  });
}


function indexBusStopLocations(locationArray) {
  const locationObj = {};
  locationArray.forEach(element => {
    locationObj[element.no] = {
      lat: element.lat,
      lng: element.lng
    };
  });
  return locationObj;
}

function dataIsMarked(busData) {
  return !!busData.markerId;
}

function createTimeRange(start, end) {
  return {
    start,
    end
  }
}

function tagDataSet(dataSet, busStopLocations, startDate, endDate) {
  dataSet = _.cloneDeep(dataSet);
  const busStopCodes = getAllBusStopCodes(dataSet);

  const markersToAdd = [];

  const currentTime = moment(startDate);
  const endTime = moment(endDate);

  const mainTimeRange = createTimeRange(currentTime, endTime);

  dataSet = filterDataInDateRange(dataSet, mainTimeRange);

  while (currentTime.isBefore(endTime)) {

    const currentTimeRange = createTimeRange(moment(currentTime), moment(currentTime).add(TIME_STEP_MINUTES, 'm'));
    const nextTimeRange = createTimeRange(moment(currentTime).add(TIME_STEP_MINUTES, 'm'), moment(currentTime).add(TIME_STEP_MINUTES * 2, 'm'));

    const currentTimeRangeData = filterDataInDateRange(dataSet, currentTimeRange);
    const nextTimeRangeData = filterDataInDateRange(dataSet, nextTimeRange);

    const currentDataByBusStop = dataByBusStop(currentTimeRangeData);
    const nextDataByBusStop = dataByBusStop(nextTimeRangeData);


    busStopCodes.forEach(busStopCode => {

      const currentTimeBusStopData = currentDataByBusStop[busStopCode] || [];
      const nextTimeBusStopData = nextDataByBusStop[busStopCode] || [];

      const currentTimeBusStopSortedData = sortByDistance(currentTimeBusStopData);
      const nextTimeBusStopSortedData = sortByDistance(nextTimeBusStopData);


      currentTimeBusStopSortedData.forEach(busData => {

        let currentMarkerId;
        if (dataIsMarked(busData)) {
          currentMarkerId = busData.markerId;
        } else {
          currentMarkerId = generateId();
          assignMarkerId(busData, currentMarkerId);
        }

        let nextTimeShortestDistanceData = nextTimeBusStopSortedData[0];

        if (!nextTimeShortestDistanceData || nextTimeShortestDistanceData.distance > busData.distance) {

          if (busData.distance < 0.8) {
            markersToAdd.push(createNewMarkerReachedStop(busData, currentTimeRange.end, busStopLocations));
          }
          return;
        }

        nextTimeShortestDistanceData = nextTimeBusStopSortedData.shift();
        assignMarkerId(nextTimeShortestDistanceData, currentMarkerId);

      });

    });

    currentTime.add(1, 'm');
  }

  const result = _.union(dataSet, markersToAdd);
  const untaggedElements = result.some(element => {
    return !element.markerId;
  });
  if (untaggedElements) {
    console.warn('WARN: There are untagged elements!');
  }

  return result;
}

/**
 * Changes the latitude and longitude strings to float
 */
function cleanUpData(dataSet) {
  return dataSet.map(data => {
    const copy = Object.assign({}, data);
    copy.Latitude = parseFloat(copy.Latitude);
    copy.Longitude = parseFloat(copy.Longitude);
    return copy;
  });
}

function main(dataSet, busStops) {
  const busStopLocations = indexBusStopLocations(busStops);

  const cleanedData = cleanUpData(dataSet);
  const taggedData = tagDataSet(cleanedData, busStopLocations, startDate, endDate);

  return dataByMarker(taggedData);
}
export default main;
