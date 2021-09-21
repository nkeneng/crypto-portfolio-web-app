import firebase from "firebase/app";

/**
 * @description listens to events related to authentication such as login , logout ...
 * @param callback
 * @returns {firebase.Unsubscribe}
 * @constructor
 */
export const AddAuthListener = (callback) => {

    const onChange = (user) => {
        if (user){
            callback({})
        }else {
            callback(null)
        }
    }
    return firebase.auth().onAuthStateChanged(onChange)
}
