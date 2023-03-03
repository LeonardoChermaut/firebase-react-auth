import React from "react";
import { AuthProvider } from "./contexts/index";
import { PrivateRoute, PrivateLayout } from "./routers/index";
import { Dashboard } from "./components/index";
import { Signup, Login, ForgotPassword, Profile } from "./pages/index";
import { BrowserRouter as Router, Switch, Route, Redirect,} from "react-router-dom";

export const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/">
            <Redirect to="/inicio" />
          </Route>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/esqueci-minha-senha" component={ForgotPassword} />
          <PrivateRoute>
            <PrivateLayout>
              <Switch>
                <PrivateRoute exact path="/inicio" component={Dashboard} />
                <PrivateRoute path="/perfil" component={Profile} />
              </Switch>
            </PrivateLayout>
          </PrivateRoute>
        </Switch>
      </AuthProvider>
    </Router>
  );
};
