import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { App } from "../App";
import { PlaidTokens } from "../pages/PlaidTokens";

export const AppRouter: React.FC = () => {
  return (
    <>
      <Router>
        <App>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/" />} />
            <Route path="/plaid" component={PlaidTokens} key="plaid" exact />
          </Switch>
        </App>
      </Router>
    </>
  );
};
