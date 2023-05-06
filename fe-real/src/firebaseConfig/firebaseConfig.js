import { initializeApp } from 'firebase/app';
import { FacebookAuthProvider, GoogleAuthProvider, getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyDJjyyCjNar014hP0O9uKFFuU46kAlFZj0',
    authDomain: 'demo2-users.firebaseapp.com',
    projectId: 'demo2-users',
    storageBucket: 'demo2-users.appspot.com',
    messagingSenderId: '562281446659',
    appId: '1:562281446659:web:54e152bbcf2e694115fd36',
    measurementId: 'G-PGYD0KX2RC',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const providerFacebook = new FacebookAuthProvider();

const providerGoogle = new GoogleAuthProvider();

export { auth, providerFacebook, providerGoogle, app };
