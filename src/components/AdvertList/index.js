import { connect } from 'react-redux';

import AdvertList from './AdvertList';

const mapStateToProps = state => ({
    adverts: state.adverts.adverts
});

export default connect(mapStateToProps)(AdvertList);