import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { alertRequest, EMAIL_ALREADY, MESSAGE_EMAIL_ERROR , MESSAGE_PASSWORD_WEAK_ERROR, PASSWORD_WEAK  } from "../utils/index";
import {
  auth,
  createUser,
  signOutUser,
  signInUser,
  passwordReset,
  onAuthChange,
  updateEmailUser,
  updatePasswordUser,
} from "../db/firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const mountedRef = useRef(true);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const authentication = auth.currentUser;

  const login = async (email, password) => {
    try {
      const { user } = await signInUser(auth, email, password);
      if (mountedRef.current) {
        setCurrentUser(user);
      }
    } catch (error) {
      alertRequest();
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await signOutUser(auth);
      if (mountedRef.current) {
        setCurrentUser(null);
      }
    } catch (error) {
      alertRequest();
      console.error(error);
    }
  };

  const signup = async (email, password) => {
  try {
    const { user } = await createUser(auth, email, password);
    if (mountedRef.current) {
      setCurrentUser(user);
    }
  } catch (error) {
    if (error.code === EMAIL_ALREADY) {
      alertRequest(MESSAGE_EMAIL_ERROR);
    } else {
      if (error.code === PASSWORD_WEAK) {
        alertRequest(MESSAGE_PASSWORD_WEAK_ERROR);
      } else {
        alertRequest();
        console.error(error);
      }
    }
  }
};
  
  const resetPassword = async (email) => {
    try {
      await passwordReset(email);
    } catch (error) {
      alertRequest();
      console.error(error);
    }
  };

  const updateEmail = async (email) => {
    try {
      await updateEmailUser(authentication, email);
      setCurrentUser({ ...currentUser, ...updateEmail });
    } catch (error) {
      alertRequest();
      console.error(error);
    }
  };

  const updatePassword = async (password) => {
    try {
      await updatePasswordUser(authentication, password);
      setCurrentUser({ ...currentUser, ...updatePassword });
    } catch (error) {
      alertRequest();
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthChange(auth, (user) => {
      if (mountedRef.current) {
        setCurrentUser(user);
        setLoading(false);
      }
    });

    return () => {
      mountedRef.current = false;
      unsubscribe();
    };
  }, []);

  const isAuthenticated = () => !!currentUser;

  const authContextValue = {
    currentUser,
    isAuthenticated,
    login,
    signup,
    logout,
    resetPassword,
    updatePassword,
    updateEmail,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
