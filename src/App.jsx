import React from "react";
import { Dashboard } from "./components/index";
import { PrivateRoutes, PrivateLayout } from "./routers/index";
import { AuthProvider, useAuth } from "./contexts/authContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {
  Signup,
  Login,
  ForgotPassword,
  Profile,
  EmployeeRegister,
  EmployeeList,
} from "./pages/index";

export const App = () => {
  const { isAuthenticated } = useAuth() ?? {};

  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/login" component={isAuthenticated ? Redirect : Login} />
          <Route path="/registro" component={isAuthenticated ? Redirect : Signup} />
          <Route path="/esqueci-minha-senha" component={isAuthenticated ? Redirect : ForgotPassword}/>
          <Redirect exact from="/" to="/login" />
          <PrivateRoutes path="/">
            <PrivateLayout>
              <Route exact path="/inicio" component={Dashboard} />
              <Route exact path="/cadastrar" component={EmployeeRegister} />
              <Route exact path="/funcionarios" component={EmployeeList} />
              <Route exact path="/perfil" component={Profile} />
            </PrivateLayout>
          </PrivateRoutes>
        </Switch>
      </AuthProvider>
    </Router>
  );
};
