import React, {PropTypes} from 'react';
import moment from 'moment';

const START = moment(new Date('Thu Mar 31 2016 11:00:00 GMT+0800 (SGT)'));

function dateStringToValue(currentDate) {
  const startSeconds = START.unix();
  const currentSeconds = currentDate.unix();
  return (currentSeconds - startSeconds) / 60;
}

function slider({currentDate, onChangeDate}) {
  function onChange(event) {
    const start = moment(START);
    start.add(event.target.value, 'm');
    console.log(start);
    onChangeDate(start);
  }

  const currentDateValue = dateStringToValue(currentDate);

  return (
    <div>
      <input min="0" max="60" step="1" type="range" value={currentDateValue} onChange={onChange.bind(null)}/>
    </div>
  );
}

slider.propTypes = {
  onChangeDate: PropTypes.func.isRequired,
  currentDate: PropTypes.object.isRequired
};


export default slider;
