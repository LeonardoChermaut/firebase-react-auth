import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import {
  showMessageRequest,
  showMessageWelcome,
  EMAIL_ALREADY,
  EMAIL_ERROR_MESSAGE,
  PASSWORD_WEAK_ERROR_MESSAGE,
  PASSWORD_WEAK,
  USER_NOT_FOUND,
  USER_NOT_FOUND_MESSAGE,
  USER_SUCCESS_REGISTER_MESSAGE,
} from "../utils/index";
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
import { useHistory } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const history = useHistory();
  const mountedRef = useRef(true);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (email, password) => {
    try {
      const { user } = await signInUser(auth, email, password);
      if (mountedRef.current) {
        setCurrentUser(user);
      }
      showMessageWelcome();
    } catch (error) {
      if (error.code === USER_NOT_FOUND) {
        showMessageRequest(USER_NOT_FOUND_MESSAGE).then(() => {
          history.push("/login");
        });
      } else {
        showMessageRequest();
        console.error(error);
      }
    }
  };

  const logout = async () => {
    try {
      await signOutUser(auth);
      if (mountedRef.current) {
        setCurrentUser(null);
      }
    } catch (error) {
      showMessageRequest();
      console.error(error);
    }
  };

  const signup = async (email, password) => {
    try {
      const { user } = await createUser(auth, email, password);
      if (mountedRef.current) {
        setCurrentUser(user);
      }
      showMessageRequest(USER_SUCCESS_REGISTER_MESSAGE);
      history.replace("/login");
    } catch (error) {
      if (error.code === EMAIL_ALREADY) {
        showMessageRequest(EMAIL_ERROR_MESSAGE);
      }
      if (error.code === PASSWORD_WEAK) {
        showMessageRequest(PASSWORD_WEAK_ERROR_MESSAGE);
      } else {
        showMessageRequest();
        console.error(error);
      }
    }
  };

  const resetPassword = async (email) => {
    try {
      await passwordReset(email);
    } catch (error) {
      showMessageRequest();
      console.error(error);
    }
  };

  const updateUserCredentials = async (email, password) => {
    try {
      const authentication = auth.currentUser;
      if (email && email !== currentUser.email) {
        await updateEmailUser(authentication, email);
      }

      if (password) {
        await updatePasswordUser(authentication, password);
      }
      setCurrentUser((prevUser) => ({ ...prevUser, email }));
    } catch (error) {
      showMessageRequest();
      console.error(error);
    }
  };

  const unsubscribe = onAuthChange(auth, (user) => {
    if (mountedRef.current) {
      setCurrentUser(user);
      setLoading(false);
    }
  });

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      unsubscribe();
    };
  }, [unsubscribe]);

  const isAuthenticated = () => !!currentUser;

  const authContextValue = {
    currentUser,
    isAuthenticated,
    login,
    signup,
    logout,
    resetPassword,
    updateUserCredentials,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
