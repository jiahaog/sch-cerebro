import React, {PropTypes} from 'react';
import Modal from 'react-modal';

function infoModal({isInfoModalOpen, hideInfoModal}) {
  const style = {overlay: {zIndex: 10}};
  return (
    <Modal
      isOpen={isInfoModalOpen}
      style={style}
    >
      <a className={`button is-small fa fa-times is-pulled-right`} onClick={hideInfoModal}/>
      <div className="content">
        <h1>Modal Content</h1>
        <p>Etc.</p>
      </div>
    </Modal>
  )
}

infoModal.propTypes = {
  isInfoModalOpen: PropTypes.bool.isRequired,
  hideInfoModal: PropTypes.func.isRequired,
};

export default infoModal;
