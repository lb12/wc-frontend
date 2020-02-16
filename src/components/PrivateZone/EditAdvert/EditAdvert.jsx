import React from "react";

import Tags from "../../Tags";
import Advert from "../../Advert";
import ErrorNotifier from "../../ErrorNotifier";

import "./EditAdvert.css";
import NotFoundPage from "../../NotFoundPage";

export default class EditAdvert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      advert: {
        id: "",
        name: "",
        price: "",
        description: "",
        photo: "",
        photoPreview: "",
        tags: [],
        forSale: "",
        member: ""
      },
      showError: false,
      errorMessage: "",
      editingAdvert: false
    };
  }

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

    if (!files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
      this.setState(({ advert }) => ({
        editingAdvert: false,
        showError: true,
        errorMessage: "El archivo no es una imagen",
        advert: {
          ...advert,
          photo: "",
          photoPreview: ""
        }
      }));
      return;
    }

    this.setState(({ advert }) => ({
      editingAdvert: true,
      showError: false,
      errorMessage: "",
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

  onSubmit = evt => {
    evt && evt.preventDefault();

    const {
      name,
      forSale,
      tags,
      price,
      description,
      photo
    } = this.state.advert;

    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("name", name);
    formData.append("for_sale", forSale);
    formData.append("tags", tags);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("member", this.props.loggedUser._id);

    this.props.createAdvert(formData);
  };

  render() {
    const { advert, showError, errorMessage, editingAdvert } = this.state;
    const { name, price, description, tags, forSale } = advert;

    const updateOrCreateAdvert = this.state.editingAdvert ? "Edit" : "Create";
    return (
      <div>
        <h1 className="text-center mt-4">{updateOrCreateAdvert} advert</h1>

        <form className="create-edit-container mt-4" onSubmit={this.onSubmit}>
          <div className="main-info-container">
            <div className="info-container mb-5rem">
              <div className="form-group">
                <label className="input-label" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  required
                  name="name"
                  id="name"
                  className="form-control"
                  value={name}
                  placeholder="Name"
                  onChange={this.onInputChange}
                />
              </div>
              <div className="form-group">
                <label className="input-label" htmlFor="description">
                  Description
                </label>
                <textarea
                  required
                  name="description"
                  id="description"
                  className="form-control"
                  value={description}
                  placeholder="Write a description of the product"
                  onChange={this.onInputChange}
                />
              </div>
              <div className="form-group">
                <label className="input-label" htmlFor="price">
                  Price
                </label>
                <input
                  type="number"
                  required
                  name="price"
                  id="price"
                  className="form-control"
                  value={price}
                  placeholder="Price"
                  onChange={this.onInputChange}
                />
              </div>
              <div className="form-group">
                <label className="input-label" htmlFor="tags-select">
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
                  <span className="input-label">Type</span>
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
                    Buy
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
                    Sell
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label className="input-label" htmlFor="photo">
                  Upload a photo
                </label>
                {showError && errorMessage.length > 0 && (
                  <div>
                    <ErrorNotifier errors={[errorMessage]} />
                  </div>
                )}

                <input
                  type="file"
                  required
                  name="photo"
                  id="photo"
                  className="form-control"
                  onChange={this.onUploadFile}
                />
              </div>
            </div>
            <div className="preview-container mb-5rem">
              <h2 className="text-center mt-5">Preview</h2>
              <div id="advert-preview" className="mb-5rem">
                <Advert advert={advert} editingAdvert={editingAdvert} />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary edit-ad-submit-btn">
            {updateOrCreateAdvert}
          </button>
        </form>
      </div>
    );
  }
}
