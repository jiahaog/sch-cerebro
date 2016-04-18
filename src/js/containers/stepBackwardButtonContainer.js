import {connect} from 'react-redux';
import {stepTimeBackward} from './../actions'
import stepButton from './../components/stepBackwardButton';


function mapDispatchToProps(dispatch) {
  return {
    onClick: () => {
      dispatch(stepTimeBackward());
    }
  }
}

const stepButtonContainer = connect(
  null,
  mapDispatchToProps
)(stepButton);

export default stepButtonContainer; 
