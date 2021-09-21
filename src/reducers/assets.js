import {
    ASSETS_LIST_ERROR,
    ASSETS_LIST_RECEIVED,
    ASSETS_LIST_REQUEST
} from "./action-type";

export default (state = {
    assets: null,
    isFetchingAssets: true,
}, action) => {
    switch (action.type) {
        case ASSETS_LIST_REQUEST:
            state = {
                ...state,
                isFetchingAssets: true,
            };
            return state;
        case ASSETS_LIST_RECEIVED:
            console.log("action.data : ",action.data);
            state = {
                ...state,
                assets: action.data,
                isFetchingAssets: false
            };
            return state;
        case ASSETS_LIST_ERROR:
            return {
                ...state,
                isFetchingAssets: false,
                assets: null
            };
        default:
            return state;
    }
}
