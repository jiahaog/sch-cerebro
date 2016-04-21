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
            <a className="header-item title" href="#">
              <i className="fa fa-bus" aria-hidden="true"></i>
              <span className="navbar-title-words">Cerebro</span>
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
        <div className="map-controls-container">
          <div className="container map-controls">
            <div className="control-columns v-center">
              <div className="control-column">
                <DateSlider />
              </div>
              <div className="control-column">
                <StepBackwardButton />
              </div>
              <div className="control-column">
                <StepForwardButton />
              </div>
              <div className="control-column">
                <PlayButton />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default app;
