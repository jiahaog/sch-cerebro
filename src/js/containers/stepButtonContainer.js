import {connect} from 'react-redux';
import {stepTime} from './../actions'
import stepButton from './../components/stepButton';


function mapDispatchToProps(dispatch) {
  return {
    onClick: () => {
      dispatch(stepTime());
    }
  }
}

const stepButtonContainer = connect(
  null,
  mapDispatchToProps
)(stepButton);

export default stepButtonContainer;
