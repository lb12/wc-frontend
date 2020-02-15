import React from "react";
import { withTranslation } from "react-i18next";

import "./Modal.css";

class Modal extends React.Component {
  onConfirm = () => {
    this.props.onConfirm();
  };

  render() {
    const { modalId, type, title, body, confirmButtonText } = this.props;
    return (
      <div
        className="modal fade"
        id={`modal-${modalId}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby={`modal-${modalId}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`modal-${modalId}Label`}>
                {title}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p className="m-0">{body}</p>
            </div>
            <div className="modal-footer justify-content-center">
              <button
                type="button"
                className={`btn btn-${type}`}
                data-dismiss="modal"
                onClick={this.onConfirm}
              >
                {confirmButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(Modal);
