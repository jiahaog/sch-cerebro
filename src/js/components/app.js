import React from 'react';
import DateSlider from '../containers/sliderContainer';
import TimeDisplay from '../containers/TimeDisplayContainer';
import StepButton from './../containers/stepButtonContainer';
import PlayButton from './../containers/playButtonContainer';

function app() {
  return (
    <div>
      <DateSlider />
      <TimeDisplay />
      <StepButton />
      <PlayButton />
    </div>
  );
}

export default app;
