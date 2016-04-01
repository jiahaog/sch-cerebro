import React, {PropTypes} from 'react';

function timeDisplay({currentDate}) {
  return (
    <div>
      {currentDate.format("dddd, MMMM Do YYYY, h:mm:ss a")}
    </div>
  );
}

timeDisplay.propTypes = {
  currentDate: PropTypes.object.isRequired
};


export default timeDisplay;
