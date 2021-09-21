import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_RECEIVED,
  USER_SET_ID
} from "./action-type";


export default (state = {
  userId: null,
  isFetchingUser:true,
  isAuthenticated: false,
  userData: null
}, action) => {

  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userId: action.userId,
        isAuthenticated: true,
        isFetchingUser: false
      };
    case USER_SET_ID:
      return {
        ...state,
        userId: action.userId,
        isAuthenticated: true
      };
    case USER_PROFILE_RECEIVED:
      return {
        ...state,
        userData: (state.userData === null || action.userData !== state.userData)
            ? action.userData : state.userData,
        isAuthenticated: (action.userData !== null),
        isFetchingUser: false
      };
    case USER_LOGOUT:
      return {
        ...state,
        userId: null,
        isAuthenticated: false,
        userData: null
      };
    default:
      return state;
  }
}
