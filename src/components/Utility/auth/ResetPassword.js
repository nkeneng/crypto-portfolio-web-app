import firebase from "firebase/app";


/**
 * @description reset the user password by sending an email
 * @param email
 * @returns {Promise<void>}
 * @constructor
 */
export const ResetPassword = async (email) => {
    try{
      await firebase.auth().sendPasswordResetEmail(email);
    }catch (e){
        throw new Error('Error sending reset link')
    }
}
