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
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import Profile from "../Profile";
import AdvertDetail from "../AdvertDetail";

// Private zone components imports
import PrivateHome from "../PrivateHome";

// Component imports
import "./App.css";
import NotFoundPage from "../NotFoundPage";

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
              <div className="global-container">
                {this.isUserLogged() && (
                  <React.Fragment>
                    <div id="main">
                      <Switch>
                        <Route exact path="/my-zone" component={PrivateHome} />
                      </Switch>
                    </div>
                  </React.Fragment>
                )}
                <React.Fragment>
                  <Switch>
                    <Route path="/sign-in" component={SignIn} />
                    <Route path="/sign-up" component={SignUp} />
                    <Route path="/profile/:username/:id" component={Profile} />
                    <Route path="/advert/:advertSlug/:id" component={AdvertDetail} />
                    <Route exact path="/" component={PublicHome} />
                    <Route exact path='*' component={NotFoundPage} />
                  </Switch>
                </React.Fragment>
              </div>
              <Footer />
            </Router>
          </Provider>
        </ErrorBoundary>
      </div>
    );
  }
}
