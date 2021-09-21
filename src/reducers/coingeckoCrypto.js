import {
    COINGECKOCRYPTOS_LIST_ERROR,
    COINGECKOCRYPTOS_LIST_RECEIVED,
    COINGECKOCRYPTOS_LIST_REQUEST
} from "./action-type";

export default (state = {
    coingeckoCrypto: null,
    isFetchingCoingeckoCryptos: true,
}, action) => {
    switch (action.type) {
        case COINGECKOCRYPTOS_LIST_REQUEST:
            state = {
                ...state,
                isFetchingCoingeckoCryptos: true,
            };
            return state;
        case COINGECKOCRYPTOS_LIST_RECEIVED:
            state = {
                ...state,
                coingeckoCrypto: action.data,
                isFetchingCoingeckoCryptos: false
            };
            return state;
        case COINGECKOCRYPTOS_LIST_ERROR:
            return {
                ...state,
                isFetchingCoingeckoCryptos: false,
                coingeckoCrypto: []
            };
        default:
            return {
                ...state
            }
    }
}
