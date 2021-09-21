import {
    COINGECKOEXCHANGES_LIST_ERROR,
    COINGECKOEXCHANGES_LIST_RECEIVED,
    COINGECKOEXCHANGES_LIST_REQUEST
} from "./action-type";

export default (state = {
    coingeckoExchanges: null,
    isFetchingCoingeckoExchanges: true,
}, action) => {
    switch (action.type) {
        case COINGECKOEXCHANGES_LIST_REQUEST:
            state = {
                ...state,
                isFetchingCoingeckoExchanges: true,
            };
            return state;
        case COINGECKOEXCHANGES_LIST_RECEIVED:
            state = {
                ...state,
                coingeckoExchanges: action.data,
                isFetchingCoingeckoExchanges: false
            };
            return state;
        case COINGECKOEXCHANGES_LIST_ERROR:
            return {
                ...state,
                isFetchingCoingeckoExchanges: false,
                coingeckoExchanges: []
            };
        default:
            return {
                ...state
            }
    }
}
