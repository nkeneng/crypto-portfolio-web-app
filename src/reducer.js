import {combineReducers} from "redux";
import {reducer as formReducer} from 'redux-form';
import auth from "./reducers/auth";
import {routerReducer} from "react-router-redux";
import registration from "./reducers/registration";


// * combine all reducers together and export as one reducer
export default combineReducers({
  auth,
  registration,
  router: routerReducer,
  form: formReducer
});
