import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import {
    userLogout,
    userProfileFetch,
    userSetId
} from "../../actions/actions";
import {connect} from "react-redux";

const mapStateToProps = state => ({
    ...state.auth
});



function PrivateRoute  ({ component: Component ,isAuthenticated,...rest}) {
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )
            }
        />
    )
}

PrivateRoute = connect(mapStateToProps)(PrivateRoute);

export default connect(mapStateToProps, null)(PrivateRoute);