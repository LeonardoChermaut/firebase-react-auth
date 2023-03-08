import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
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
    return () => {
      setIsUserAuthenticated(false);
    };
  }, [isAuthenticated, history]);

  if (!isUserAuthenticated) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={(props) => (
        <PrivateLayout>
          <Component {...props} />
        </PrivateLayout>
      )}
    />
  );
};
