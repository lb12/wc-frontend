import { connect } from 'react-redux';

import PrivateHome from './PrivateHome';

const mapStateToProps = state => ({
    user: state.user.user
});

export default connect(mapStateToProps, {})(PrivateHome);