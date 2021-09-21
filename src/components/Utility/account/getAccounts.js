import * as React from 'react';
import firebase from 'firebase/app'

export const getAccounts = async (userId) => {

    const querySnapshot = await firebase.firestore()
        .collection('Account')
        .where('owner', '==', userId)
        .get();

    return querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
    }))

};
