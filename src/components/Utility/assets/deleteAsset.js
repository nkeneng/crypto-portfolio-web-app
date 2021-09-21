import * as React from 'react';
import firebase from 'firebase/app'

export const deleteAsset = async (id) => {

    const res = await firebase.firestore()
        .collection('Asset')
        .doc(id)
        .delete();

    return res

};
