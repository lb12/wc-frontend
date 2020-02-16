import { connect } from 'react-redux';
import Fav from './Fav';

import { setUserFavs } from '../../store/actions';

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    setUserFavs: favs => dispatch(setUserFavs(favs))
});

export default connect(mapStateToProps, mapDispatchToProps)(Fav);