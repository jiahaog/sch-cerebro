import {CHANGE_TIME} from './../actions';
import moment from 'moment';
const INITIAL_STATE = {
  date: moment(new Date('Thu Mar 31 2016 11:00:00 GMT+0800 (SGT)'))
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_TIME:
      return Object.assign({}, state, {
        date: action.payload
      });
    default:
      return state;
  }
}

export default reducer;
