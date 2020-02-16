import { connect } from "react-redux";
import EditAdvert from "./EditAdvert";

import { createAdvert, editAdvert, fetchAdvert } from "../../../store/actions";

const mapStateToProps = state => ({
    loggedUser: state.user.user,
    advert: state.advert.advert
});

const mapDispatchToProps = dispatch => ({
  createAdvert: formData => dispatch(createAdvert(formData)),
  editAdvert: formData => dispatch(editAdvert(formData)),
  getAdvert: advertId => dispatch(fetchAdvert(advertId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditAdvert);
