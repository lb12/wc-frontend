import { connect } from "react-redux";
import Unsubscribe from "./Unsubscribe";

import { unsubscribeUser } from '../../../store/actions';

const mapStateToProps = state => ({
    user: state.user,
    errorMessage: state.errorMessage
});
const mapDispatchToProps = dispatch => ({
    unsubscribe: () => dispatch(unsubscribeUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Unsubscribe);
