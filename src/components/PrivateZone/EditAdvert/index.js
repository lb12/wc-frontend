import { connect } from "react-redux";
import EditAdvert from "./EditAdvert";

import { createAdvert } from "../../../store/actions";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  createAdvert: formData => dispatch(createAdvert(formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditAdvert);
