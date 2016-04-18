import {connect} from 'react-redux';
import {stepTimeForward} from './../actions'
import stepButton from './../components/stepForwardButton';


function mapDispatchToProps(dispatch) {
  return {
    onClick: () => {
      dispatch(stepTimeForward());
    }
  }
}

const stepButtonContainer = connect(
  null,
  mapDispatchToProps
)(stepButton);

export default stepButtonContainer; 
