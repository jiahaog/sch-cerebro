import React, {PropTypes} from 'react';

function showModalButton({onClick}) {
  return (
    <a className={`fa fa-question-circle navbar-button`} onClick={onClick}>
    </a>
  );
}

showModalButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default showModalButton;
