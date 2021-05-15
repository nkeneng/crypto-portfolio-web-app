import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {connect} from "react-redux";
import {
  userLogout,
  userProfileFetch,
  userSetId
} from "./actions/actions";
import PrivateRoute
  from "./components/layouts/PrivateRoute";

const Preloader = React.lazy(() => import("./components/layouts/Preloader"));
const Home = React.lazy(() => import("./components/pages/Home"));
const Comingsoon = React.lazy(() => import("./components/pages/prebuilt-pages/Comingsoon"));
const Defaultlogin = React.lazy(() => import("./components/pages/prebuilt-pages/Defaultlogin"));
const Defaultregister = React.lazy(() => import("./components/pages/prebuilt-pages/Defaultregister"));
const Lockscreen = React.lazy(() => import("./components/pages/prebuilt-pages/Lockscreen"));



const mapStateToProps = state => ({
  ...state.auth
});

const mapDispatchToProps = {
  userProfileFetch, userSetId, userLogout
};

class App extends React.Component{
  render() {
    return (
        <Router>
          <Suspense fallback={<div></div>}>
            <Preloader />
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute path="/prebuilt-pages/coming-soon" component={Comingsoon} />
              <PrivateRoute path="/prebuilt-pages/lock-screen" component={Lockscreen} />
              <Route path="/login" component={Defaultlogin} />
              <Route path="/register" component={Defaultregister} />
            </Switch>
          </Suspense>
        </Router>
    );
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(App);
