import {connect} from 'react-redux';
import infoModal from './../components/infoModal';
import {toggleInfo} from './../actions'

function mapStateToProps(state) {
  return {
    isInfoModalOpen: state.isInfoModalOpen
  }
}

function mapDispatchToProps(dispatch) {
  return {
    hideInfoModal: () => {
      dispatch(toggleInfo());
    }
  }
}

const infoModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(infoModal);

export default infoModalContainer;
