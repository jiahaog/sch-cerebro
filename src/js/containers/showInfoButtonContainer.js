import {connect} from 'react-redux';
import {toggleInfo} from './../actions'
import showInfoButton from './../components/showInfoButton';

function mapDispatchToProps(dispatch) {
  return {
    onClick: () => {
      dispatch(toggleInfo());
    }
  }
}

const showInfoButtonContainer = connect(
  null,
  mapDispatchToProps
)(showInfoButton);

export default showInfoButtonContainer;
