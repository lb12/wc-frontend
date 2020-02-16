import  { connect } from 'react-redux';
import Advert from './Advert';
import { setAdvertToDelete } from '../../store/actions';
import { isUserLogged } from '../../store/selectors';

const mapStateToProps = state => ({
    user: state.user.user,
    isLogged: isUserLogged(state.user)
});

const mapDispatchToProps = dispatch => ({
    setAdvertToDelete: advert => dispatch(setAdvertToDelete(advert))
});

export default connect(mapStateToProps, mapDispatchToProps)(Advert);