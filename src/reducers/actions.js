import {SignIn} from "../components/Utility/auth";
import {USER_LOGOUT, USER_PROFILE_ERROR, USER_PROFILE_RECEIVED, USER_PROFILE_REQUEST, USER_SET_ID} from "../actions/constants";
import {getCurrentUserInfo} from "../components/Utility/getCurrentUserInfo";
import {
    ACCOUNTS_LIST_ERROR,
    ACCOUNTS_LIST_RECEIVED,
    ACCOUNTS_LIST_REQUEST,
    ASSETS_LIST_ERROR,
    ASSETS_LIST_RECEIVED,
    ASSETS_LIST_REQUEST,
    COINGECKOCRYPTOS_LIST_ERROR,
    COINGECKOCRYPTOS_LIST_RECEIVED, COINGECKOCRYPTOS_LIST_REQUEST, COINGECKOEXCHANGES_LIST_ERROR, COINGECKOEXCHANGES_LIST_RECEIVED, COINGECKOEXCHANGES_LIST_REQUEST
} from "./action-type";
import {getAccounts} from "../components/Utility/account/getAccounts";
import {getAssets} from "../components/Utility/assets/getAssets";
import {getCoingeckoCryptos, getCoingeckoExchanges} from "../components/Utility/getCoingeckoCryptos";

export const userLoginAttempt = (username, password) => {
    return async (dispatch) => {
        console.log(" API :: login user");
        await SignIn(username, password).then(
            async () => {
                dispatch(userProfileFetch())
            }
        ).catch((e) => {
            throw new Error(e.message)
        });
    }
};

export const userLogout = () => {
    return async (dispatch) => {
        dispatch(logoutAndDelete())
        dispatch(accountsListError())
        dispatch(assetsListError())
        dispatch(coingeckoCryptosListError())
        dispatch(coingeckoExchangesListError())
    }
};

export const logoutAndDelete = () => {
    return {
        type: USER_LOGOUT
    }
};

export const userProfileReceived = (userId, userData) => {
    return {
        type: USER_PROFILE_RECEIVED,
        userData,
        userId
    }
};

export const userSetId = (userId) => {
    return {
        type: USER_SET_ID,
        userId
    }
};

export const userProfileRequest = () => {
    return {
        type: USER_PROFILE_REQUEST
    }
};

export const userProfileError = () => {
    return {
        type: USER_PROFILE_ERROR,
    }
};

export const userProfileFetch = () => {

    return async (dispatch) => {
        dispatch(userProfileRequest());
        console.log(" API :: fetching user profile");
        return await getCurrentUserInfo().then(
            response => {
                dispatch(userProfileReceived(response.id, response))
            }
        ).catch(() => dispatch(userProfileError()))
    }
};


/// ACCOUNTS

export const accountsListRequest = () => {
    return {
        type: ACCOUNTS_LIST_REQUEST,
    }
};

export const accountsListError = (error) => ({
    type: ACCOUNTS_LIST_ERROR,
    error
});

export const accountsListReceived = (data) => ({
    type: ACCOUNTS_LIST_RECEIVED,
    data
});

export const accountsListFetch = (userId) => {
    return async (dispatch) => {
        dispatch(accountsListRequest());
        console.log(" API ::  fetching accounts list");
        return await getAccounts(userId).then(response => {
            dispatch(accountsListReceived(response))
        }).catch(error => {
            dispatch(accountsListError(error))
        });
    }
};

export const accountsListUpdate = (accounts) => {
    return async (dispatch) => {
        dispatch(accountsListRequest());
        setTimeout(() => {
            dispatch(accountsListReceived(accounts))
        }, 3000);
    }
};


/// ASSETS

export const assetsListRequest = () => {
    return {
        type: ASSETS_LIST_REQUEST,
    }
};

export const assetsListError = (error) => ({
    type: ASSETS_LIST_ERROR,
    error
});


export const assetsListUpdate = (assets) => {
    return async (dispatch) => {
        dispatch(assetsListRequest());
        setTimeout(() => {
            dispatch(assetsListReceived(assets))
        }, 3000);
    }
};


export const assetsListReceived = (data) => ({
    type: ASSETS_LIST_RECEIVED,
    data
});

export const assetsListFetch = (userId) => {
    return async (dispatch) => {
        dispatch(assetsListRequest());
        console.log("API :: fetching assets list");
        return await getAssets(userId).then(response => {
            dispatch(assetsListReceived(response))
        }).catch(error => {
            dispatch(assetsListError(error))
        });
    }
};

/// Coingecko cryptos

export const coingeckoCryptosListRequest = () => {
    return {
        type: COINGECKOCRYPTOS_LIST_REQUEST,
    }
};

export const coingeckoCryptosListError = (error) => ({
    type: COINGECKOCRYPTOS_LIST_ERROR,
    error
});

export const coingeckoCryptosListReceived = (data) => ({
    type: COINGECKOCRYPTOS_LIST_RECEIVED,
    data
});

export const coingeckoCryptosListFetch = () => {
    return async (dispatch) => {
        dispatch(coingeckoCryptosListRequest());
        console.log(" API :: fetching crypto list");
        return getCoingeckoCryptos().then(response => {
            dispatch(coingeckoCryptosListReceived(response))
        }).catch(error => {
            dispatch(coingeckoCryptosListError(error))
        });
    }
};


/// Coingecko exchanges

export const coingeckoExchangesListRequest = () => {
    return {
        type: COINGECKOEXCHANGES_LIST_REQUEST,
    }
};

export const coingeckoExchangesListError = (error) => ({
    type: COINGECKOEXCHANGES_LIST_ERROR,
    error
});

export const coingeckoExchangesListReceived = (data) => ({
    type: COINGECKOEXCHANGES_LIST_RECEIVED,
    data
});

export const coingeckoExchangesListFetch = () => {
    return async (dispatch) => {
        dispatch(coingeckoExchangesListRequest());
        console.log(" API :: fetching exchanges list");
        return getCoingeckoExchanges().then(response => {
            dispatch(coingeckoExchangesListReceived(response))
        }).catch(error => {
            dispatch(coingeckoExchangesListError(error))
        });
    }
};
