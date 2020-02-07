// React imports
import { connect } from "react-redux";

// Component imports
import Navbar from "./Navbar";
import { isUserLogged } from '../../store/selectors';
import { setUser } from '../../store/actions';

const mapStateToProps = state => ({
    isLogged: isUserLogged(state.user)
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(setUser({}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);