import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";
import { signUp, signIn } from "../../store/auth/actions";
import { AuthenticateDto } from "../../services/auth";

type AuthenticationProps = {};

export const Authentication: React.FC<AuthenticationProps> = () => {
  const [signUpForm, setSignUpForm] = useState<boolean>(false);
  const dispatch = useDispatch();
  const toggleForm = () => setSignUpForm(!signUpForm);
  const label = signUpForm ? "Sign Up" : "Sign In";

  const dispatchLogin = (params: AuthenticateDto) => {
    dispatch(signIn(params));
  };

  const dispatchSignUp = (params: AuthenticateDto) => {
    dispatch(signUp(params));
  };

  return (
    <div>
      <Card className="bg-light">
        <Card.Header>Employee Conference Room Bookings</Card.Header>
        <Card.Body>
          <h2>{label}</h2>

          {signUpForm && (
            <SignUpForm
              dispatchSignUp={dispatchSignUp}
              toggleForm={toggleForm}
            />
          )}

          {!signUpForm && (
            <LoginForm dispatchLogin={dispatchLogin} toggleForm={toggleForm} />
          )}
        </Card.Body>
      </Card>
      <div className="Auth-subtext">
        Be sure to use an email with an @coke.com or @pepsi.com domain
      </div>

      <div className="Auth-subtext">
        Test Credentials - email: user@pepsi.com password: pepsi
      </div>
    </div>
  );
};
