import React, {PropTypes} from 'react';

function showModalButton({onClick}) {
  return (
    <a className={`button is-primary fa fa-info`} onClick={onClick}>
    </a>
  );
}

showModalButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default showModalButton;
