// React imports
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

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
import ForgotPassword from "../Auth/ForgotPassword";
import ResetPassword from "../Auth/ResetPassword";

// Private zone components imports
import PrivateHome from "../PrivateZone/PrivateHome";
import UserUpdate from "../PrivateZone/UserUpdate";
import Unsubscribe from "../PrivateZone/Unsubscribe";
import EditAdvert from "../PrivateZone/EditAdvert";
import MyAdverts from "../PrivateZone/MyAdverts";

// Component imports
import "./App.css";
import NotFoundPage from "../NotFoundPage";

export default class App extends React.Component {
  isUserLogged = () => {
    return this.props.isLogged;
  };

  render() {
    const { store } = this.props;

    return (
      <React.Fragment>
        <ErrorBoundary>
          <Provider store={store}>
            <Router>
              <Navbar />
              <main className="global-container">
                <React.Fragment>
                  <Switch>
                    <Route path="/my-zone/unsubscribe">
                      { this.isUserLogged() ? <Unsubscribe /> : <Redirect to="/sign-in"/> }
                    </Route>
                    <Route path="/my-zone/update-my-data">
                      { this.isUserLogged() ? <UserUpdate /> : <Redirect to="/sign-in"/> }
                    </Route>
                    <Route path="/my-zone/create-advert">
                      { this.isUserLogged() ? <EditAdvert /> : <Redirect to="/sign-in"/> }
                    </Route>
                    <Route path="/my-zone/edit-advert/:id">
                      { this.isUserLogged() ? <EditAdvert /> : <Redirect to="/sign-in"/> }
                    </Route>
                    <Route path="/my-zone/my-adverts">
                      { this.isUserLogged() ? <MyAdverts /> : <Redirect to="/sign-in"/> }
                    </Route>
                    <Route path="/my-zone/favourite-adverts">
                      { this.isUserLogged() ? <MyAdverts loadFavs={true} /> : <Redirect to="/sign-in"/> }
                    </Route>
                    <Route exact path="/my-zone">
                      { this.isUserLogged() ? <PrivateHome /> : <Redirect to="/sign-in"/> }
                    </Route>
                    <Route path="/sign-in" component={SignIn} />
                    <Route path="/sign-up" component={SignUp} />
                    <Route path="/profile/:slug/:username/:id" component={Profile} />
                    <Route path="/advert/:advertSlug/:id" component={AdvertDetail} />
                    <Route path="/forgot-password" component={ForgotPassword} />
                    <Route path="/reset-password/:token" component={ResetPassword} />
                    <Route exact path="/" component={PublicHome} />
                    <Route exact path='*' component={NotFoundPage} />
                  </Switch>
                </React.Fragment>
              </main>
              <Footer />
            </Router>
          </Provider>
        </ErrorBoundary>
      </React.Fragment>
    );
  }
}
