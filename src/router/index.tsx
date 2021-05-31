import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { App } from "../App";
import { MyBookings } from "../pages/MyBookings";
import { ScheduleBookings } from "../pages/ScheduleBookings";

export const AppRouter: React.FC = () => {
  return (
    <>
      <Router>
        <App>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Redirect to="/my-bookings" />}
            />
            <Route
              path="/my-bookings"
              component={MyBookings}
              key="my-bookings"
              exact
            />
            <Route
              path="/schedule-bookings"
              component={ScheduleBookings}
              key="schedule-bookings"
              exact
            />
          </Switch>
        </App>
      </Router>
    </>
  );
};
