import React from "react";
import { Dashboard, EmployeeForm } from "./components/index";
import { AuthProvider, useAuth } from "./contexts/authContext";
import { PrivateRoute, PrivateLayout } from "./routers/index";
import { Signup, Login, ForgotPassword, Profile } from "./pages/index";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

export const App = () => {
  const { isAuthenticated } = useAuth() ?? {};

  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Redirect exact from="/" to="/inicio" />
          <Route path="/registro" component={isAuthenticated ? Redirect : Signup} />
          <Route path="/login" component={isAuthenticated ? Redirect : Login} />
          <Route path="/esqueci-minha-senha" component={isAuthenticated ? Redirect : ForgotPassword} />
          <PrivateRoute path="/">
            <PrivateLayout>
              <Route path="/inicio" component={Dashboard} />
              <Route path="/usuario" component={EmployeeForm} />
              <Route path="/perfil" component={Profile} />
            </PrivateLayout>
          </PrivateRoute>
        </Switch>
      </AuthProvider>
    </Router>
  );
};