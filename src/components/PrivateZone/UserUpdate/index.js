import { connect } from "react-redux";
import UserUpdate from "./UserUpdate";

import { updateUserData, updateUserPassword } from '../../../store/actions';

const mapStateToProps = state => ({
    user: state.user,
    errorMessage: state.errorMessage
});
const mapDispatchToProps = dispatch => ({
    updateLoginCredentials: userObj => dispatch(updateUserData(userObj)),
    updatePassword: password => dispatch(updateUserPassword(password))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserUpdate);
