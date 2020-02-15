// React imports
import { connect } from 'react-redux';

// Component imports
import App from './App';
import { isUserLogged } from '../../store/selectors';

const mapStateToProps = state => ({
    isLogged: isUserLogged(state.user),
    loggedUser: state.user
});

export default connect(mapStateToProps)(App);