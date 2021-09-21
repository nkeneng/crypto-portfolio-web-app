import {
    createStore,
    applyMiddleware,
} from "redux";
import rootReducer from "../reducers/index";
import thunk from 'redux-thunk';
import {
    persistReducer,
    persistStore
} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import {composeWithDevTools} from "redux-devtools-extension";

const enhancer = composeWithDevTools(
    applyMiddleware(thunk)
);


const myReducer = persistReducer({
    key: 'portfolioApp',
    storage,
    whitelist: ['auth','accounts','assets','coingeckoCrypto','coingeckoExchanges']
}, rootReducer);

const store = createStore(myReducer, enhancer);

export const persistor = persistStore(store);

export default store;
