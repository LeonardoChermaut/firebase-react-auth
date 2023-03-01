import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../index";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const signup = async (email, password) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      setCurrentUser(user);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const login = async (email, password) => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      setCurrentUser(user);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setCurrentUser(null);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const resetPassword = async (email) => {
    try {
      await auth.sendPasswordResetEmail(email);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      await currentUser.updateEmail(updatedUser.email);
      await currentUser.updatePassword(updatedUser.password);
      setCurrentUser({ ...currentUser, ...updatedUser });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setCurrentUser);
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
