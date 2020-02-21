import { connect } from "react-redux";

import { fetchAdvert } from "../../store/actions";
import AdvertDetail from "./AdvertDetail";

const mapStateToProps = state => ({
  advert: state.advert
});

const mapDispatchToProps = dispatch => ({
  getAdvert: id => dispatch(fetchAdvert(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdvertDetail);
