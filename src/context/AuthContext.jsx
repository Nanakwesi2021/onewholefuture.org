/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('mockUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  function login(email, password) {
    // Development bypass since Firebase Auth is not configured on the project
    if (email === 'admin@onewholefuture.org') {
      const mockUser = { email, uid: 'mock-admin-uid' };
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      setCurrentUser(mockUser);
      return Promise.resolve({ user: mockUser });
    }
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    localStorage.removeItem('mockUser');
    setCurrentUser(null);
    // Ignore errors if firebase auth fails
    return signOut(auth).catch(() => {});
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!localStorage.getItem('mockUser')) {
        setCurrentUser(user);
      }
      setLoading(false);
    });

    // Timeout to stop loading state if Firebase Auth network request hangs
    const timeout = setTimeout(() => setLoading(false), 2000);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
