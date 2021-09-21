import firebase from "firebase/app";

/**
 * @description get the current user
 * @returns {null|{id: string}}
 */
export const getCurrentUser = () => {

    const user = firebase.auth().currentUser
    if (!user) return null
    return {
        id: user.uid
    }
}
