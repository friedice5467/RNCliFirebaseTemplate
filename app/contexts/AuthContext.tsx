import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import auth from '@react-native-firebase/auth';
import { AppUser } from '../models/appUser';  
import firestore from '../../shims/firebase-firestore-web';  
import { GoogleSignin } from '@react-native-google-signin/google-signin';

type AuthState = {
    isUserAuthenticated: boolean;
    setIsUserAuthenticated: (isAuthenticated: boolean) => void;
    user: AppUser | null;
    setUser: (user: AppUser | null) => void;
    introNeeded: boolean;
    setIntroNeeded: (needed: boolean) => void;
    signOut: () => Promise<void>;
};

const initialState: AuthState = {
    isUserAuthenticated: false,
    setIsUserAuthenticated: () => {},
    user: null,
    setUser: () => {},
    introNeeded: false,
    setIntroNeeded: () => {},
    signOut: async () => {} 
};

const UserContext = createContext<AuthState>(initialState);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    const [user, setUser] = useState<AppUser | null>(null);
    const [introNeeded, setIntroNeeded] = useState(false);

    const signOut = async () => {
        await GoogleSignin.signOut();
        await auth().signOut();
        setIsUserAuthenticated(false);
    }

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(async (user) => {
            if (user) {
                setIsUserAuthenticated(true);
                const userProfileRef = firestore().collection('users').doc(user.uid);
                const doc = await userProfileRef.get();
                if (!doc.exists) {
                    setIntroNeeded(true);  
                } else {
                    setUser({...user, ...doc.data() as AppUser});
                    setIntroNeeded(false); 
                }
            } else {
                setUser(null);
                setIntroNeeded(false); 
                setIsUserAuthenticated(false);
            }
        });
        return () => unsubscribe(); 
    }, []);
    

    const contextValue = useMemo(() => ({
        isUserAuthenticated,
        setIsUserAuthenticated,
        user,
        setUser,
        introNeeded,
        setIntroNeeded,
        signOut
    }), [user, introNeeded]); 
    
    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

// Hook to use the auth state in components
function useAuthState(): AuthState {
    return useContext(UserContext);
}

export { UserContext, useAuthState, AuthProvider };
