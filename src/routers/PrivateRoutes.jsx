import React, { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { PrivateLayout } from "./PrivateLayout";

export const PrivateRoutes = ({ component: Component, ...rest }) => {
  const history = useHistory();
  const { isAuthenticated } = useAuth();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const authenticated = await isAuthenticated();
      setIsUserAuthenticated(authenticated);
      if (!authenticated) {
        history.push("/login");
      }
    };
    checkAuthentication();
    return () => setIsUserAuthenticated(false);
  }, [isAuthenticated, history]);

  return (
    <Route {...rest}>
      {isUserAuthenticated && (
        <PrivateLayout>
          <Component />
        </PrivateLayout>
      )}
    </Route>
  );
};
