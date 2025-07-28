import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebase/config.js';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
            try {
                if (user) {
                    const userDocRef = doc(FIREBASE_DB, "users", user.uid);
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        setCurrentUser({ ...user, ...userDoc.data() });
                    } else {
                        setCurrentUser(user);
                    }
                } else {
                    setCurrentUser(null);
                }
            } catch (error) {
                console.error("Error in AuthProvider:", error);
                setCurrentUser(user);
            } finally {
                setLoading(false);
            }
        });

        return unsubscribe;
    }, []);

    const value = { currentUser };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};