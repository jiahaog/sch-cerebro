import {connect} from 'react-redux';
import timeDisplay from './../components/timeDisplay';

function mapStateToProps(state) {
  return {
    currentDate: state.date
  }
}

const timeDisplayContainer = connect(
  mapStateToProps)
(timeDisplay);

export default timeDisplayContainer;
