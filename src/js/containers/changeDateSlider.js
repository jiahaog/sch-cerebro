import {connect} from 'react-redux';
import {changeTime} from './../actions'

import slider from './../components/slider';

function mapStateToProps(state) {
  return {
    currentDate: state.date
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeDate: (newDate) => {
      dispatch(changeTime(newDate));
    }
  }
}

const changeDateSlider = connect(
  mapStateToProps,
  mapDispatchToProps
)(slider);

export default changeDateSlider;
