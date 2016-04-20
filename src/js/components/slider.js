import React, {PropTypes} from 'react';
import moment from 'moment';

const SLIDER_RANGE_MINUTES = 60;

function dateToSliderValue(startDate, currentDate) {
  const startSeconds = startDate.unix();
  const currentSeconds = currentDate.unix();
  return (currentSeconds - startSeconds) / 60;
}

function slider({startDate, currentDate, onChangeDate}) {
  function onChange(event) {
    const start = moment(startDate);
    start.add(event.target.value, 'm');
    onChangeDate(start);
  }

  const sliderValue = dateToSliderValue(startDate, currentDate);

  return (
    <div>
      <input min="0" max={SLIDER_RANGE_MINUTES} step="1" type="range" value={sliderValue} onChange={onChange.bind(null)}/>
    </div>
  );
}

slider.propTypes = {
  onChangeDate: PropTypes.func.isRequired,
  currentDate: PropTypes.object.isRequired
};


export default slider;
