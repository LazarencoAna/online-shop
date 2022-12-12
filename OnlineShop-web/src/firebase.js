import { initializeApp } from 'firebase/app';
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    
} from 'firebase/auth';
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const app = initializeApp({
    apiKey: "AIzaSyB-R9W-BCE2RJm6pfCOz6ySEd3FcoVfFvQ",
    authDomain: "test-firebase-auth-3feac.firebaseapp.com",
    projectId: "test-firebase-auth-3feac",
    storageBucket: "test-firebase-auth-3feac.appspot.com",
    messagingSenderId: "918396845809",
    appId: "1:918396845809:web:f789f20a3e0b05afafb350"
});

const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, 'users'), where('uid', '==', user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                name: user.displayName,
                authProvider: 'google',
                email: user.email,
            });
        }
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        } else {
            console.log('Unexpected error', err);
        }
    }
};

/**
 *
 * @param {*} email
 * @param {*} password
 */
const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        } else {
            console.log('Unexpected error', err);
        }
    }
};

/**
 *
 * @param {*} name
 * @param {*} email
 * @param {*} password
 */
const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, 'users'), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        });
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        } else {
            console.log('Unexpected error', err);
        }
    }
};

/**
 *
 * @param {*} email
 */
const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert('Password reset link sent!');
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        } else {
            console.log('Unexpected error', err);
        }
    }
};

const logout = () => {
    signOut(auth);
};

const storage = getStorage(app);


export {
    auth,
    db,
    storage,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};
