import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import { auth, createUser, signOutUser, signInUser } from "../db/firebase";
import { authReducer } from "./authReducer";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [state, dispatch] = useReducer(authReducer, { currentUser });

  const login = async (email, password) => {
    try {
      const { user } = await signInUser(auth, email, password);
      dispatch({ type: "LOGIN", payload: user });
    } catch (error) {
      console.error("error login\n", error.message);
    }
  };

  const logout = async () => {
    try {
      await signOutUser(auth);
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error(error.message);
    }
  };

  const signup = async (email, password) => {
    try {
      const { user } = await createUser(auth, email, password);
      dispatch({ type: "SIGNUP", payload: user });
    } catch (error) {
      console.error(error.message);
    }
  };

  const resetPassword = async (email) => {
    try {
      await auth.sendPasswordResetEmail(email);
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
    const unsubscribe = auth.onAuthStateChanged(setCurrentUser);
    return unsubscribe;
  }, []);

  const value = {
    currentUser: state.currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
