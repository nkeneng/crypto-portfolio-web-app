import * as React from 'react';
import firebase from 'firebase/app'

export const deleteAccount = async (id) => {

    const res = await firebase.firestore()
        .collection('Account')
        .doc(id)
        .delete();

    return res

};
