import React, {PropTypes} from 'react';

function playButton({isPlayingBack, onClick}) {
  return (
    <div>
      <button onClick={onClick}>{isPlayingBack ? 'PAUSE' : 'PLAY'}</button>
    </div>
  );
}

playButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isPlayingBack: PropTypes.bool.isRequired
};

export default playButton;
