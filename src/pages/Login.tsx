import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { loginRequest } from "../api/authRequest";
import { AuthContext } from "../context/AuthContext";
import { loginRequest as loginRequestType } from '../@types/auth';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export function Login() {
  
  const { setAuth,persist,setPersist } = useContext(AuthContext);
 
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  } as loginRequestType);


  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const { auth: { accessToken } } = useContext(AuthContext);
  
  if (accessToken) {
    console.log("Already logged in")
    navigate(from);
  }


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginRequest({
      username: formData.username,
      password: formData.password,
    }).then((data) => {
      const { access_token, role, username } = data;
      localStorage.setItem("persist", JSON.stringify(persist));
      localStorage.setItem("auth", JSON.stringify({ accessToken:access_token, role, username }));
      setAuth({ accessToken:access_token, role, username });
      navigate(from);
    }).catch((err) => { console.error(err); }); 
    
  };
  return (
 
        <Row className="mt-5 justify-content-center align-items-center">
          <Col md={{ span: 6 }}>
            <Card>
              <Card.Header>Login</Card.Header>
              <Card.Body>
                <Form onSubmit={onSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicUsernmae">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="username"
                      placeholder="Enter username"
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Row>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <Form.Check
                          type="checkbox"
                          label="Check me out"
                          checked={persist}
                          onChange={(e) => setPersist(e.target.checked)}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="d-flex justify-content-end">
                      <Link to="/register">Register</Link>
                    </Col>
                  </Row>
                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </div>

                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

  );
}
