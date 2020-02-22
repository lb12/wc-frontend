import React from "react";
import { withTranslation } from "react-i18next";

import Spinner from "../../Spinner";
import AdvertList from "../../AdvertList";
import Pagination from "../../Pagination";
import ErrorNotifier from "../../ErrorNotifier";
import Modal from "../../Modal";
import "./MyAdverts.css";

class MyAdverts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showError: false,
      isLoading: false,
      errorMessage: []
    };
  }
  componentDidMount() {
    this.props.resetPaginationFilters();
    this.getMemberAdverts();
  }

  getMemberAdverts = () => {
    const { user, loadFavs, loadAdverts, loadFavouriteAdverts } = this.props;
    const { _id } = user;
    this.setState({ isLoading: true });

    loadFavs && loadFavouriteAdverts(_id);
    !loadFavs && loadAdverts(_id);
    this.setState({ isLoading: false });
  };

  onPageChanged = () => {
    this.getMemberAdverts();
  };

  // Elimina definitivamente el anucio que pretendiamos eliminar en el store
  confirmDelete = async () => {
    const { advertToDelete } = this.props;

    this.setState({ isLoading: true });
    await this.props.deleteAdvert(advertToDelete);
    this.setState({ isLoading: false });

    const { errorMessage, t } = this.props;

    if (errorMessage && !errorMessage.success && errorMessage.message) {
      this.setState({
        showError: true,
        errorMessage: [t(errorMessage.message)]
      });
      return;
    }
    this.props.resetPaginationFilters();
    this.getMemberAdverts();
  };

  render() {
    const { t, loadFavs } = this.props;
    const { showError, errorMessage, isLoading } = this.state;
    return (
      <div className="p-3 mt-4">
        <h1 className="font-size-2 text-center mt-5 mb-5">
          {loadFavs ? t("MY_FAV_ADVERTS") : t("MY_ADS")}
        </h1>
        {showError && errorMessage.length > 0 && (
          <ErrorNotifier errors={errorMessage} />
        )}
        <div className="text-center">
          <Spinner isLoading={isLoading} />
        </div>
        <AdvertList />
        <Pagination onPageChanged={this.onPageChanged} />
        <Modal
          modalId="deleteAdvert"
          type="danger"
          title={t("CONFIRM")}
          body={t("DELETE_ADVERT_MESSAGE")}
          confirmButtonText={t("DELETE_ADVERT")}
          onConfirm={this.confirmDelete}
        />
      </div>
    );
  }
}
export default withTranslation()(MyAdverts);
