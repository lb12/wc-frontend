import React from "react";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";

import "./EditAdvert.css";
import Tags from "../../Tags";
import Advert from "../../Advert";
import Spinner from "../../Spinner";
import ErrorNotifier from "../../ErrorNotifier";
import errorCheckers from "../../../utils/errorCheckers";

class EditAdvert extends React.Component {
  constructor(props) {
    super(props);

    const { _id, username } = this.props.loggedUser;

    this.state = {
      advert: {
        id: "",
        name: "",
        price: "0",
        description: "",
        photo: "",
        photoPreview: "",
        tags: [],
        forSale: "",
        member: { _id, username }
      },
      showError: false,
      errorMessage: [],
      isLoading: false,
      photoError: "",
      successSave: false,
      editingPhoto: false,
      editingAdvert:
        this.props.location.pathname.split("/")[2] === "edit-advert"
    };
  }

  componentDidMount() {
    const { editingAdvert } = this.state;

    // Cargo el anuncio por su id sólo si estamos editando
    if (!editingAdvert) {
      return;
    }

    const { id } = this.props.match.params;
    this.loadAdvert(id);
  }

  loadAdvert = async advertId => {
    this.setState({ isLoading: true });
    await this.props.getAdvert(advertId);

    const { advert, t } = this.props;

    // Error al cargar el anuncio
    if (advert && advert.data && advert.data.message) {
      this.setState({
        showError: true,
        isLoading: false,
        errorMessage: [t(advert.data.message)]
      });
      return;
    }

    this.setState({ isLoading: false });

    const loadedAdvert = advert.advert;

    // Solo el autor puede editar sus anuncios
    if (this.props.loggedUser._id !== loadedAdvert.member._id) {
      return this.props.history.push("/my-zone");
    }

    this.setState(({ advert }) => ({
      advert: {
        ...advert,
        ...loadedAdvert
      }
    }));
  };

  onInputChange = evt => {
    const { name, value } = evt.target;
    this.updateState(name, value);
  };

  onRadioChange = evt => {
    const { id } = evt.target;
    this.updateState("forSale", id === "sell");
  };

  onUploadFile = evt => {
    const { files } = evt.target;
    const { t } = this.props;

    if (!files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
      this.setState(({ advert }) => ({
        editingPhoto: false,
        showError: true,
        photoError: t("ERROR_IMAGE_UPLOAD_EXTENSION"),
        advert: {
          ...advert,
          photo: "",
          photoPreview: ""
        }
      }));
      return;
    }

    this.setState(({ advert }) => ({
      editingPhoto: true,
      showError: false,
      errorMessage: [],
      photoError: "",
      advert: {
        ...advert,
        photo: files[0],
        photoPreview: URL.createObjectURL(files[0])
      }
    }));
  };

  onSelectChange = selectedTags => {
    this.updateState("tags", selectedTags);
  };

  updateState = (name, value) => {
    this.setState(({ advert }) => ({
      advert: {
        ...advert,
        [name]: value
      }
    }));
  };

  onSubmit = async evt => {
    evt && evt.preventDefault();

    const { editingPhoto, editingAdvert, advert } = this.state;
    const { id, name, forSale, tags, price, description, photo } = advert;
    const { t } = this.props;

    const formData = new FormData();

    if (!photo) {
      return this.setState({ showError: true, errorMessage: [t("PHOTO_FILE_IS_MANDATORY")] });
    }

    editingPhoto && formData.append("photo", photo);
    editingAdvert && formData.append("id", id);
    formData.append("name", name);
    formData.append("for_sale", forSale);
    formData.append("tags", tags);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("member", this.props.loggedUser._id);

    this.setState({ isLoading: true });

    !editingAdvert && (await this.props.createAdvert(formData));
    editingAdvert && (await this.props.editAdvert(formData));

    const { advert: newAdvert } = this.props;

    // Ha ocurrido un error al guardar el anuncio en el backend, mostramos el error
    if (newAdvert && newAdvert.data && !newAdvert.data.success) {
      const errorMessage = errorCheckers(newAdvert, t);
      this.setState({ showError: true, errorMessage, isLoading: false });
      return;
    }

    this.setState({ showError: false, successSave: true, isLoading: false });
  };

  render() {
    const {
      advert,
      showError,
      errorMessage,
      photoError,
      editingPhoto,
      successSave,
      isLoading
    } = this.state;
    const { name, price, description, tags, forSale } = advert;
    const { t } = this.props;

    const updateOrCreateAdvert = this.state.editingAdvert
      ? t("EDIT")
      : t("CREATE");
    return (
      <div className="create-edit-container p-3">
        <div className="form-container">
          <h1 className="font-size-2 text-center mt-5 mb-5">
            {`${updateOrCreateAdvert} ${t("ADVERT").toLowerCase()}`}{" "}
          </h1>

          {showError && errorMessage.length > 0 && (
            <ErrorNotifier errors={errorMessage} />
          )}
          {successSave && (
            <div className="alert alert-success" role="alert">
              <strong>{t("ADVERT_SAVED_SUCCESFULLY")}</strong>
            </div>
          )}
          <div className="text-center">
            <Spinner isLoading={isLoading} />
          </div>
          <div className="card mb-5">
            <div className="p-4">
              <form className="d-flex flex-column" onSubmit={this.onSubmit}>
                <div className="info-container mb-5rem">
                  <div>
                    <div className="form-group">
                      <label className="font-weight-bold" htmlFor="name">
                        {t("NAME")}
                      </label>
                      <input
                        type="text"
                        required
                        name="name"
                        id="name"
                        className="form-control"
                        value={name}
                        placeholder={t("NAME")}
                        onChange={this.onInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="font-weight-bold" htmlFor="description">
                        {t("DESCRIPTION")}
                      </label>
                      <textarea
                        required
                        name="description"
                        id="description"
                        className="form-control"
                        value={description}
                        placeholder={t("DESCRIPTION_PLACEHOLDER")}
                        onChange={this.onInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="font-weight-bold" htmlFor="price">
                        {t("PRICE")}
                      </label>
                      <input
                        type="number"
                        required
                        name="price"
                        id="price"
                        className="form-control"
                        value={price}
                        placeholder={t("PRICE")}
                        onChange={this.onInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="form-group">
                      <label className="font-weight-bold" htmlFor="tags-select">
                        Tags
                      </label>
                      <Tags
                        multiple={true}
                        required={true}
                        selectedTags={tags}
                        onTagSelected={this.onSelectChange}
                      />
                    </div>
                    <div className="form-group">
                      <div>
                        <span className="font-weight-bold">{t("STATUS")}</span>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          required
                          name="type"
                          id="buy"
                          className="form-check-input"
                          value={forSale}
                          checked={forSale === false}
                          onChange={this.onRadioChange}
                        />
                        <label className="form-check-label" htmlFor="buy">
                          {t("ON_PURCHASE")}
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          required
                          name="type"
                          id="sell"
                          className="form-check-input"
                          value={forSale}
                          checked={forSale === true}
                          onChange={this.onRadioChange}
                        />
                        <label className="form-check-label" htmlFor="sell">
                          {t("ON_SALE")}
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="font-weight-bold" htmlFor="photo">
                        {t("PRODUCT_IMAGE")}
                      </label>
                      {showError && photoError.length > 0 && (
                        <div>
                          <ErrorNotifier errors={[photoError]} />
                        </div>
                      )}
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="photo"
                          onChange={this.onUploadFile}
                        />
                        <label className="custom-file-label" htmlFor="photo">
                          {t("UPLOAD_A_PHOTO")}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className={`btn btn-primary edit-ad-submit-btn ${ successSave ? 'hidden' : '' }`}
                  disabled={isLoading}
                >
                  {`${updateOrCreateAdvert} ${t("ADVERT").toLowerCase()}`}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="preview-container mb-5rem">
          <h2 className="font-size-1-5 text-center mt-5 mb-5">
            {t("ADVERT_PREVIEW")}
          </h2>
          <div id="advert-preview" className="mb-5rem">
            <Advert advert={advert} editingPhoto={editingPhoto} />
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(withTranslation()(EditAdvert));
