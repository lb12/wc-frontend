import React from "react";
import "./ErrorNotifier.css";

export default class NotFoundPage extends React.Component {
  buildErrors = errors => {    
    return (
      <ul className="error-notification">
        {errors.map((error, index) => (
          <li className="alert alert-danger" role="alert" key={index}>
            {error}
          </li>
        ))}
      </ul>
    );
  };

  render() {
    const { errors } = this.props;
    return <div>{errors && errors.length && this.buildErrors(errors)}</div>;
  }
}
