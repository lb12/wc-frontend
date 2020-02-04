// React imports
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Global components imports
import Navbar from "../Navbar";
import Footer from "../Footer";
import ErrorBoundary from "../ErrorBoundary";

// Public zone components imports
import PublicHome from "../PublicHome";
import SignIn from "../SignIn";
import SignUp from "../SignUp";

// Private zone components imports
import PrivateHome from "../PrivateHome";

// Component imports
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  isUserLogged = () => {
    return this.props.isLogged;
  };

  render() {
    const { store } = this.props;

    return (
      <div>
        <ErrorBoundary>
          <Provider store={store}>
            <Router>
              <Navbar />
              <div className="asd">
                <React.Fragment>
                  <Switch>
                    <Route path="/sign-in" component={SignIn} />
                    <Route path="/sign-up" component={SignUp} />
                    <Route exact path="/" component={PublicHome} />
                  </Switch>
                </React.Fragment>

                {this.isUserLogged() && (
                  <React.Fragment>
                    <div id="main">
                      <Switch>
                        <Route exact path="/my-zone" component={PrivateHome} />
                      </Switch>
                    </div>
                  </React.Fragment>
                )}
              </div>
              <Footer />
            </Router>
          </Provider>
        </ErrorBoundary>
      </div>
    );
  }
}
