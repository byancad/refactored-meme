import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AuthenticateDto } from "../../services/auth";

type SignUpFormProps = {
  toggleForm: () => void;
  dispatchSignUp: (params: AuthenticateDto) => void;
};

export const SignUpForm: React.FC<SignUpFormProps> = ({
  toggleForm,
  dispatchSignUp,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const create = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatchSignUp({ email, password });
    setEmail("");
    setPassword("");
    toggleForm();
  };

  return (
    <Form onSubmit={create}>
      <Form.Group controlId="email">
        <Form.Control
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(event) => {
            setEmail(
              event.currentTarget.value
                ? event.currentTarget.value.toString()
                : ""
            );
          }}
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setPassword(
              event.currentTarget.value
                ? event.currentTarget.value.toString()
                : ""
            );
          }}
        />
      </Form.Group>
      <Button className="submit-btn full-width" variant="primary" type="submit">
        Submit
      </Button>

      <span className="md-text">Already have a account? </span>
      <Button variant="link" onClick={() => toggleForm()}>
        Log In
      </Button>
    </Form>
  );
};
