import firebase from "firebase/app";

/**
 * @description Fucntion to sign in a user
 * @param email
 * @param password
 * @returns {Promise<string>}
 * @constructor
 */
export const SignIn = async (email, password) => {
    try{
        const result = await firebase.auth().signInWithEmailAndPassword(email, password);

        return result.user.uid
    }catch (e){
        throw new Error(e.message)
    }
}
