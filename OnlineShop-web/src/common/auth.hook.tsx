import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    auth,
    registerWithEmailAndPassword,
    logout,
    signInWithGoogle,
    getGoogleUserProfile,
} from '../firebase';
import { User } from 'firebase/auth';
import {
    useAuthState,
    useSignInWithEmailAndPassword,
    EmailAndPasswordActionHook,
} from 'react-firebase-hooks/auth';
import { clearCart } from '../store/cart/cartSlice';
import { clearFavorite } from '../store/favorite/favoriteSlice';
import { useDispatch } from 'react-redux';
import { UpdateUserAccountAsync } from '../api/StoreApi';
import { IUserAccount } from '../api/store-api';
export type AuthType = {
    user: User | undefined | null;
    loadingProfile: boolean;
    userProfile: IGoogleUserProfile | undefined;
    loginWithGoogle: () => void;
    logout: () => void;
    signupLocal: (username: string, email: string, password: string) => void;
};

export interface IGoogleUserProfile {
    role: string;
}

const authContext = createContext<AuthType | null>(null);

export function ProvideAuth({ children }: React.PropsWithChildren<{}>) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
    return useContext(authContext);
}

export function useCustomSignInWithEmailAndPassword(): EmailAndPasswordActionHook {
    const [signInWithEmailAndPassword, user, loading, error] =
        useSignInWithEmailAndPassword(auth);
    return [signInWithEmailAndPassword, user, loading, error];
}
 
function useProvideAuth(): AuthType {
    const [user, loading, error] = useAuthState(auth);
    const [userProfile, setUserProfile] = useState<IGoogleUserProfile>();
    const dispatch = useDispatch();
    //     firebase.auth().currentUser.getIdToken(/ forceRefresh / true)
    // .then(function(idToken) {

    // }).catch(function(error) {

    // });

    const getGoogleProfile = async () => {
        let userProfiles = await getGoogleUserProfile(user?.uid ?? '');
        if (userProfiles) {
            setUserProfile(userProfiles[0] as IGoogleUserProfile);
        }
        else {
            setUserProfile({role:'user'});
        }
    };

    useEffect(() => {
        if (user) {
            console.log(user);
            let userAccount = {
                userAccountId: user.uid,
                displayName: user.displayName ?? user.email,
                email: user.email,
            } as IUserAccount;
            UpdateUserAccountAsync(userAccount).then(() => {});
            getGoogleProfile().then(() => {});
        } else {
            setUserProfile(undefined);
        }
    }, [user]);

    useEffect(() => {
        console.log('auth');
        console.log(loading);
    }, [loading]);

    const signupLocal = (username: string, email: string, password: string) => {
        return registerWithEmailAndPassword(username, email, password);
    };

    const loginWithGoogle = () => signInWithGoogle();

    return {
        user,
        userProfile,
        loadingProfile: loading,
        signupLocal,
        loginWithGoogle,
        logout: () => {
            logout();
            dispatch(clearCart());
            dispatch(clearFavorite());
        },
    };
}
