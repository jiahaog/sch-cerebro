import {CHANGE_TIME, STEP_TIME, TOGGLE_PLAYBACK} from './../actions';
import moment from 'moment';

const INITIAL_STATE = {
  date: moment(new Date('2016-04-04T10:00:00.000Z')),
  isPlayingBack: false
};

function nextTimeStep(currentDate) {
  const currentMoment = moment(currentDate);
  currentMoment.add(1, 'm');
  return currentMoment;
}

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_TIME:
      return Object.assign({}, state, {
        date: action.payload
      });
    case STEP_TIME:
      return Object.assign({}, state, {
        date: nextTimeStep(state.date)
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
