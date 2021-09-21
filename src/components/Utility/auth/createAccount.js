import {createAuthUser} from './createAuthUser';
import firebase from "firebase/app";


/**
 * @author Steven Nkeneng
 * @description create a new user
 * @param newUserInfo
 * @returns {Promise<void>}
 */
export const createAccount = async newUserInfo => {
    let store = firebase.firestore();
    const auth = firebase.auth();
    let userId = 0
    await createAuthUser(newUserInfo).then(
        async (authUid) => {
            userId = authUid
            const createdAt = Date.now();
            await store.collection('users')
                .doc(authUid)
                .set({...newUserInfo, createdAt});
        }
    );
    return userId
};
