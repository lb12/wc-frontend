import  { connect } from 'react-redux';
import Advert from './Advert';

import { setAdvertToDelete } from '../../store/actions';

const mapStateToProps = state => ({
    user: state.user.user
});

const mapDispatchToProps = dispatch => ({
    setAdvertToDelete: advert => dispatch(setAdvertToDelete(advert))
});

export default connect(mapStateToProps, mapDispatchToProps)(Advert);