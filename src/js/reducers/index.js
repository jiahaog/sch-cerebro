import {CHANGE_TIME, STEP_TIME_FORWARD, STEP_TIME_BACKWARD, TOGGLE_PLAYBACK} from './../actions';
import {START_DATE} from './../config';
import moment from 'moment';

const INITIAL_STATE = {
  startDate: moment(new Date(START_DATE)),
  date: moment(new Date(START_DATE)),
  isPlayingBack: false
};

function timeStep(currentDate, forward) {
  const currentMoment = moment(currentDate);
  if (forward) {
    currentMoment.add(1, 'm');
  } else {
    currentMoment.subtract(1, 'm');
  }
  return currentMoment;
}

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_TIME:
      return Object.assign({}, state, {
        date: action.payload
      });
    case STEP_TIME_FORWARD:
      return Object.assign({}, state, {
        date: timeStep(state.date, true)
      });
    case STEP_TIME_BACKWARD:
      return Object.assign({}, state, {
        date: timeStep(state.date, false)
      });
    case TOGGLE_PLAYBACK:
      return Object.assign({}, state, {
        isPlayingBack: !state.isPlayingBack
      });
    default:
      return state;
  }
}

export default reducer;
