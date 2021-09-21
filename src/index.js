import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {Provider} from "react-redux";
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore'

// Css
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/animate.css/animate.css';
import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/slick-carousel/slick/slick-theme.css';
import '../node_modules/cropperjs/dist/cropper.css';
import '../node_modules/toastr/build/toastr.min.css';
import '../node_modules/react-perfect-scrollbar/dist/css/styles.css';
import '../node_modules/react-data-table-component-extensions/dist/index.css';
import '../node_modules/driver.js/dist/driver.min.css';
import './assets/vendors/iconic-fonts/flat-icons/flaticon.css';
import './assets/vendors/iconic-fonts/cryptocoins/cryptocoins.css';
import './assets/vendors/iconic-fonts/cryptocoins/cryptocoins-colors.css';
import './assets/vendors/iconic-fonts/font-awesome/css/all.min.css';
import './assets/css/style.css';
import store, {persistor} from "./reducers/store";
import {PersistGate} from "redux-persist/integration/react";
import Preloader from "./components/layouts/Preloader";

const firebaseConfig = {
    apiKey: "AIzaSyDZskxMTlRCEAJIa-qxWkcjXfK3lRk1fvI",
    authDomain: "finanzapp-80c36.firebaseapp.com",
    projectId: "finanzapp-80c36",
    storageBucket: "finanzapp-80c36.appspot.com",
    messagingSenderId: "407068919876",
    appId: "1:407068919876:web:c367fae892579eab12d411",
    measurementId: "G-MSMF8F1JSM"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<Preloader/>} persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>,
    document.getElementById('mystic')
);

reportWebVitals();
