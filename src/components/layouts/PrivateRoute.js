import React from 'react';
import {Route, Redirect} from 'react-router-dom';


export const PrivateRoute = ({isAuthed, isLoading, name, ...props}) => {

    if (!isAuthed) {
        return <Redirect to='/login'/>
    }

    return (
        <Route {...props} />
    );
}
