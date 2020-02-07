// React imports
import { connect } from "react-redux";

// Component imports
import SignIn from "./SignIn";
import { signInUser } from "../../store/actions";

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  signInUser: user => dispatch(signInUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
