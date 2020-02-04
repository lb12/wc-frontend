// React imports
import { connect } from "react-redux";

// Component imports
import SignUp from "./SignUp";
import { signUpUser } from "../../store/actions";

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  signUpUser: user => dispatch(signUpUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
