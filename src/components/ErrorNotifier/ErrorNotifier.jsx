import React from "react";
import "./ErrorNotifier.css";

export default class NotFoundPage extends React.Component {
  constructor(props) {
    super(props);
  }

  buildErrors = errors => {
    return (
      <ul className="error-container">
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    );
  };

  render() {
    const {errors} = this.props;
    return <div>{errors && errors.length && this.buildErrors(errors)}</div>;
  }
}
