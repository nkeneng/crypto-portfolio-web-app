import * as React from 'react';
import firebase from 'firebase/app'

export const saveAccount = async (account) => {

    let store = firebase.firestore();
   const result = await store.collection('Account')
        .add(account)
    return result.id
};
