import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { setAuthHeader } from "./BackendService";
import { loginRequest } from "./api/authRequest";

export function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" } as {
    username: string;
    password: string;
  });
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginRequest(formData.username, formData.password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        setAuthHeader(null);
        console.error("Error:", error);
      });
  };
  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsernmae">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
