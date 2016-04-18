import React from 'react';
import DateSlider from '../containers/sliderContainer';
import TimeDisplay from '../containers/TimeDisplayContainer';
import StepForwardButton from './../containers/stepForwardButtonContainer';
import StepBackwardButton from './../containers/stepBackwardButtonContainer';
import PlayButton from './../containers/playButtonContainer';

function app() {
  return (
    <div className="full-height">
      <header className="header header-container">
        <div className="container">
          <div className="header-left">
            <a className="header-item" href="#">
              My Bus Leh?
            </a>
          </div>
          <div className="header-right">
            <span className="header-item">
              <TimeDisplay />
            </span>
          </div>
        </div>
      </header>

      <section className="main-container">
        <div className="map">
          <div id="mapid"></div>
        </div>
        <div className="container map-controls">
          <div className="columns v-center">
            <div className="column">
              <DateSlider />
            </div>
            <div className="column">
              <StepBackwardButton />
            </div>
            <div className="column">
              <StepForwardButton />
            </div>
            <div className="column">
              <PlayButton />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default app;
