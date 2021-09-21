import * as React from 'react';
import firebase from 'firebase/app'

export const getAssets = async (userId) => {

    const querySnapshot = await firebase.firestore()
        .collection('Asset')
        .where('owner', '==', userId)
        .get();

    return querySnapshot.docs.map(doc => ({
        ...doc.data(),
        uid: doc.id,
    }))

};
