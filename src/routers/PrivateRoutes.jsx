import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { PrivateLayout } from "./PrivateLayout";

export const PrivateRoutes = ({ component: Component, ...rest }) => {
  const history = useHistory();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated()) {
      history.push("/login");
    }
    if (isAuthenticated) {
      history.push("/inicio");
    }
  }, [isAuthenticated, history]);

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
