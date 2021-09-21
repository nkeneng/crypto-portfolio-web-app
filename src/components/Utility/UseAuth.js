import {useEffect, useState} from 'react'


import {connect} from "react-redux";
import {
    userLogout,
    userProfileFetch,
    userSetId
} from "../../actions/actions";

const mapStateToProps = state => ({
    ...state.auth
});

const mapDispatchToProps = {
    userProfileFetch, userSetId, userLogout
};

function useAuth(){

    const [authInfo,setAuthInfo] = useState(() => {
        const userId = window.localStorage.getItem('userId');
        const user = userProfileFetch(userId)
        console.log(user);
        if (userId) {
            userSetId(userId);
        }
        return user
    })

    useEffect((user) => {
        console.log(user);
    },[authInfo])

    return authInfo
}

useAuth = connect(mapStateToProps,mapDispatchToProps)(useAuth);

export default connect(mapStateToProps, mapDispatchToProps)(useAuth);