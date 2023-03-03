import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, createUser, signOutUser, signInUser, passwordReset } from "../db/firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const login = async (email, password) => {
    try {
      const { user } = await signInUser(auth, email, password);
      if (mounted) setCurrentUser(user);
    } catch (error) {
      console.error("error login\n", error.message);
    }
  };

  const logout = async () => {
    try {
      await signOutUser(auth);
      if (mounted) setCurrentUser(null);
    } catch (error) {
      console.error(error.message);
    }
  };

  const signup = async (email, password) => {
    try {
      const { user } = await createUser(auth, email, password);
      if (mounted) setCurrentUser(user);
    } catch (error) {
      console.error(error.message);
    }
  };

  const resetPassword = async (email) => {
    try {
      await passwordReset(email);
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      await currentUser.updateEmail(updatedUser.email);
      await currentUser.updatePassword(updatedUser.password);
      setCurrentUser({ ...currentUser, ...updatedUser });
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    setMounted(true);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (mounted) {
        setCurrentUser(user);
        setLoading(false);
      }
    });
    return () => {
      setMounted(false);
      unsubscribe();
    };
  }, [mounted]);

  const isAuthenticated = () => !!currentUser;

  const value = {
    currentUser,
    isAuthenticated,
    login,
    signup,
    logout,
    resetPassword,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
