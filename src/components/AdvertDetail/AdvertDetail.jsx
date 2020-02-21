// React imports
import React from "react";
import { withTranslation } from "react-i18next";

// Component imports
import "./AdvertDetail.css";
import Advert from "../Advert";
import ErrorNotifier from "../ErrorNotifier";
import errorCheckers from "../../utils/errorCheckers";

class AdvertDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showError: false,
      errorMessage: []
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    await this.props.getAdvert(id);
    this.checkError();
  }

  checkError = () => {
    const { advert, t } = this.props;

    if (advert.advert) {
      return this.setState({ showError: false, errorMessage: [] });
    }

    const errorMessage = errorCheckers(advert, t);
    this.setState({ showError: true, errorMessage });
  };

  render() {
    const { advert } = this.props.advert;
    const { showError, errorMessage } = this.state;

    return (
      <React.Fragment>
        {showError && errorMessage.length > 0 && (
          <ErrorNotifier errors={errorMessage} />
        )}

        {advert && (
          <div className="advert-detail p-3">
            <Advert advert={advert} />
          </div>
        )}
      </React.Fragment>
    );
  }
}
export default withTranslation()(AdvertDetail);
