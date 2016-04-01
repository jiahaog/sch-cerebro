import React, {PropTypes} from 'react';

function stepButton({onClick}) {
  return (
    <div>
      <button onClick={onClick}>Step</button>
    </div>
  );
}

stepButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};


export default stepButton;
