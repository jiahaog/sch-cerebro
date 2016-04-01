import {connect} from 'react-redux';
import {togglePlayback} from './../actions'
import playButton from './../components/playButton';

function mapStateToProps(state) {
  return {
    isPlayingBack: state.isPlayingBack
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onClick: () => {
      dispatch(togglePlayback());
    }
  }
}

const playButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(playButton);

export default playButtonContainer;
