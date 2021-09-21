import firebase from "firebase/app";

/**
 * @description creates an authenticated user
 * @param newUserInfo
 * @returns {Promise<string>}
 */
export const createAuthUser = async newUserInfo => {
    const auth = firebase.auth();
    const {email, password} = newUserInfo;

    const newUser = await auth.createUserWithEmailAndPassword(
        email,
        password,
    );
    // await newUser.user.sendEmailVerification();

    return newUser.user.uid;
}
