import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./styles/App.css";
import { userDetails } from "./store/user/actions";
import { Spinner } from "react-bootstrap";
import { Authentication } from "./components/Authentication";
import { useAuthState } from "./store/hooks";
import { ToastWrapper } from "./components/Notification/NotificationWrapper";

export const App: React.FC = ({ children }) => {
  const auth = useAuthState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userDetails());
  }, [dispatch]);

  return (
    <div className="App">
      <ToastWrapper />

      {(!auth || auth.loading) && (
        <div className="App-header">
          <Spinner animation="grow" variant="info" />
        </div>
      )}

      {auth && !auth.loading && !auth.authenticated && (
        <div className="App-header">
          <Authentication />
        </div>
      )}
      {auth && !auth.loading && auth.authenticated && <div>{children}</div>}
    </div>
  );
};

export default App;
