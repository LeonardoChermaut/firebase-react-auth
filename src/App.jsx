import React from "react";
import { Dashboard} from "./components/index";
import { PrivateRoute, PrivateLayout } from "./routers/index";
import { AuthProvider, useAuth } from "./contexts/authContext";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Signup, Login, ForgotPassword, Profile ,EmployeeRegister, EmployeeList} from "./pages/index";

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
              <Route path="/cadastrar" component={EmployeeRegister} />
              <Route path="/funcionarios" component={EmployeeList} />
              <Route path="/perfil" component={Profile} />
            </PrivateLayout>
          </PrivateRoute>
        </Switch>
      </AuthProvider>
    </Router>
  );
};