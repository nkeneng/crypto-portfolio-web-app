import {combineReducers} from "redux";
import {reducer as formReducer} from 'redux-form';
import auth from "./auth";
import {routerReducer} from "react-router-redux";
import registration from "./registration";
import accounts from "./accounts";
import assets from "./assets";
import coingeckoCrypto from "./coingeckoCrypto";
import exchanges from "./exchanges";


// * combine all reducers together and export as one reducer
export default combineReducers({
    auth,
    accounts,
    assets,
    coingeckoCrypto,
    coingeckoExchanges: exchanges,
    registration,
    router: routerReducer,
    form: formReducer
});
