import React from "react";
import "./NotFoundPage.css";

import { Link } from "react-router-dom";

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="not-found-page">
        <h1>404</h1>
        <h2 className="text-center">Oops, something went wrong.</h2>
        <p className="text-center">This page does not exist.</p>
        <Link to="/"><button>Go home</button></Link>
      </div>
    );
  }
}
