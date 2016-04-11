import React, {PropTypes} from 'react';
import moment from 'moment';

const START = moment(new Date('2016-04-04T10:00:00.000Z'));
const SLIDER_RANGE_MINUTES = 60;

function dateStringToValue(currentDate) {
  const startSeconds = START.unix();
  const currentSeconds = currentDate.unix();
  return (currentSeconds - startSeconds) / 60;
}

function slider({currentDate, onChangeDate}) {
  function onChange(event) {
    const start = moment(START);
    start.add(event.target.value, 'm');
    onChangeDate(start);
  }

  const currentDateValue = dateStringToValue(currentDate);

  return (
    <div>
      <input min="0" max={SLIDER_RANGE_MINUTES} step="1" type="range" value={currentDateValue} onChange={onChange.bind(null)}/>
    </div>
  );
}

slider.propTypes = {
  onChangeDate: PropTypes.func.isRequired,
  currentDate: PropTypes.object.isRequired
};


export default slider;
