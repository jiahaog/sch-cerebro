import React, {PropTypes} from 'react';

function playButton({isPlayingBack, onClick}) {

  let iconClass;
  if (isPlayingBack) {
    iconClass = 'fa fa-pause';
  } else {
    iconClass = 'fa fa-play';
  }

  return (
      <a className={`button is-primary ${iconClass}`} onClick={onClick}>
      </a>
  );
}

playButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isPlayingBack: PropTypes.bool.isRequired
};

export default playButton;
