import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
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
      console.error(`Failed to login: ${error.message}`);
      throw new Error();
    }
  };

  const logout = async () => {
    try {
      await signOutUser(auth);
      if (mountedRef.current) {
        setCurrentUser(null);
      }
    } catch (error) {
      console.error(`Failed to logout: ${error.message}`);
    }
  };

  const signup = async (email, password) => {
    try {
      const { user } = await createUser(auth, email, password);
      if (mountedRef.current) {
        setCurrentUser(user);
      }
    } catch (error) {
      console.error(`Failed to signup: ${error.message}`);
    }
  };

  const resetPassword = async (email) => {
    try {
      await passwordReset(email);
    } catch (error) {
      console.error(`Failed to reset password: ${error.message}`);
    }
  };

  const updateEmail = async (email) => {
    try {
      await updateEmailUser(authentication, email);
      setCurrentUser({ ...currentUser, ...updateEmail });
    } catch (error) {
      console.error(`Ocorreu um erro ao atualizar o email: ${error.message}`);
    }
  };

  const updatePassword = async (password) => {
    try {
      await updatePasswordUser(authentication, password);
      setCurrentUser({ ...currentUser, ...updatePassword });
    } catch (error) {
      console.error(`Ocorreu um erro ao atualizar a senha: ${error.message}`);
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
