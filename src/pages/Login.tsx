import { useContext } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { loginRequest } from "../api/authRequest";
import { AuthContext } from "../context/AuthContext";
import { loginRequest as loginRequestType } from "../@types/auth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormikPasswordField from "../components/FormikPasswordField";
export function Login() {
  const {
    auth: { accessToken },
    setAuth,
    persist,
    setPersist,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  if (accessToken) {
    console.log("Already logged in");
    navigate(from);
  }

  const loginFormInitialValues: loginRequestType = {
    username: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: loginFormInitialValues,
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      loginRequest({
        username: values.username,
        password: values.password,
      })
        .then((data) => {
          const { access_token, role, username } = data;
          localStorage.setItem("persist", JSON.stringify(persist));
          localStorage.setItem(
            "auth",
            JSON.stringify({ accessToken: access_token, role, username })
          );
          setAuth({ accessToken: access_token, role, username });
          navigate(from);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  });

  return (
    <Row className="mt-5 justify-content-center align-items-center">
      <Col md={{ span: 6 }}>
        <Card>
          <Card.Header>Login</Card.Header>
          <Card.Body>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicUsernmae">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="Enter username"
                  isInvalid={
                    !!formik.touched.username && !!formik.errors.username
                  }
                  {...formik.getFieldProps("username")}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.username}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <FormikPasswordField formik={formik} />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
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
