import  { connect } from 'react-redux';
import Advert from './Advert';
import { setAdvertToDelete, setReservedAdvert, setSoldAdvert } from '../../store/actions';
import { isUserLogged } from '../../store/selectors';

const mapStateToProps = state => ({
    user: state.user.user,
    isLogged: isUserLogged(state.user)
});

const mapDispatchToProps = dispatch => ({
    setAdvertToDelete: advert => dispatch(setAdvertToDelete(advert)),
    setReservedAdvert: (advert, newReservedStatus) => dispatch(setReservedAdvert(advert, newReservedStatus)),
    setSoldAdvert: (advert, newSoldStatus) => dispatch(setSoldAdvert(advert, newSoldStatus)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Advert);