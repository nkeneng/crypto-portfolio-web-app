import React, {Suspense, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {PrivateRoute} from "./components/layouts/PrivateRoute";
import {connect} from "react-redux";
import {accountsListFetch, assetsListFetch, coingeckoCryptosListFetch, coingeckoExchangesListFetch} from "./reducers/actions";

const Preloader = React.lazy(() => import("./components/layouts/Preloader"));
const Home = React.lazy(() => import("./components/pages/Home/Home"));
const AccountMuster = React.lazy(() => import("./components/pages/Accounts/AccountMuster"));
const Comingsoon = React.lazy(() => import("./components/pages/prebuilt-pages/Comingsoon"));
const Defaultlogin = React.lazy(() => import("./components/pages/prebuilt-pages/Defaultlogin"));
const Defaultregister = React.lazy(() => import("./components/pages/prebuilt-pages/Defaultregister"));
const Lockscreen = React.lazy(() => import("./components/pages/prebuilt-pages/Lockscreen"));

const mapStateToProps = state => ({
    ...state.auth, ...state.accounts, ...state.assets, ...state.coingeckoExchanges,...state.coingeckoCrypto
});

const mapDispatchToProps = {
    coingeckoCryptosListFetch, coingeckoExchangesListFetch, assetsListFetch, accountsListFetch,
};


const App = (props) => {

    useEffect(() => {
        if (props.coingeckoCrypto !== undefined && (props.coingeckoCrypto === null) && props.userData !== null) {
            props.coingeckoCryptosListFetch()
        }
        if (props.coingeckoExchanges !== undefined && (props.coingeckoExchanges === null) && props.userData !== null) {
            props.coingeckoExchangesListFetch()
        }
        if (props.assets !== undefined && props.assets === null && props.userData !== null) {
            props.assetsListFetch(props.userData.id)
        }
        if (props.accounts !== undefined && props.accounts === null && props.userData !== null) {
            props.accountsListFetch(props.userData.id)
        }
    }, []);


    const {isAuthenticated, userData} = props;

    return (
        <Router>
            <Suspense fallback={<div></div>}>
                <Preloader/>
                <Switch>
                    <PrivateRoute isAuthed={isAuthenticated} exact path="/" userData={userData} isAuthenticated={isAuthenticated} component={Home}/>
                    <PrivateRoute isAuthed={isAuthenticated} exact path="/account/:accountname" userData={userData} isAuthenticated={isAuthenticated}
                                  component={AccountMuster}/>
                    <PrivateRoute isAuthed={isAuthenticated} path="/prebuilt-pages/coming-soon" component={Comingsoon}/>
                    <PrivateRoute isAuthed={isAuthenticated} path="/prebuilt-pages/lock-screen" component={Lockscreen}/>
                    <Route path="/login" component={Defaultlogin}/>
                    <Route path="/register" component={Defaultregister}/>
                </Switch>
            </Suspense>
        </Router>
    );
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
