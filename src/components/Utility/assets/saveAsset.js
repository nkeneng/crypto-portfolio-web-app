import * as React from 'react';
import firebase from 'firebase/app'

export const saveAsset = async (data) => {

    let store = firebase.firestore();
  const result =  await store.collection('Asset')
        .add(data)
};
