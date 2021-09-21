import {
    ACCOUNTS_LIST_ERROR,
    ACCOUNTS_LIST_RECEIVED,
    ACCOUNTS_LIST_REQUEST
} from "./action-type";

export default (state = {
    accounts: null,
    isFetchingAccounts: true,
}, action) => {
    switch (action.type) {
        case ACCOUNTS_LIST_REQUEST:
            state = {
                ...state,
                isFetchingAccounts: true,
            };
            return state;
        case ACCOUNTS_LIST_RECEIVED:
            state = {
                ...state,
                accounts: action.data,
                isFetchingAccounts: false
            };
            return state;
        case ACCOUNTS_LIST_ERROR:
            return {
                ...state,
                isFetchingAccounts: false,
                accounts: null
            };
        default:
            return state;
    }
}
