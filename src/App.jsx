import React from "react";
import { PrivateRoutes } from "./routers/index";
import { AuthProvider } from "./contexts/authContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routers/index";

export const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          {publicRoutes.map(({ path, component }) => (
            <Route exact path={path} key={path} component={component} />
          ))}
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          {privateRoutes.map(({ path, component }) => (
            <PrivateRoutes exact path={path} key={path} component={component} />
          ))}
        </Switch>
      </AuthProvider>
    </Router>
  );
};