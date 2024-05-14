import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { RegisterInputs, RegisterRequestBody, Role } from "../@types/auth";
import FormikPasswordField from "../components/FormikPasswordField";

import { useLocation, useNavigate } from "react-router-dom";
import { Card, Col, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerRequest } from "../api/authRequest";

const Register = () => {

  const [formError,setFormError] = useState<string>("");

  const {
    auth: { accessToken },
    setAuth
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const registerFormInitialValues: RegisterInputs = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    role: [] as Role[],
  };

  const formik = useFormik({
    initialValues: registerFormInitialValues,
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      username: Yup.string().required("Required"),
      password: Yup.string()
        .min(6, "Enter a min 6 characters")
        .matches(/[^A-Za-z0-9]/, "Password must contain a special character")
        .matches(/[A-Z]/, "Password must contain an uppercase letter")
        .matches(/\d/, "Password must contain a numeric character")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      role: Yup.array()
        .of(Yup.string().oneOf(["ROLE_USER", "ROLE_ADMIN", "ROLE_MOD"]))
        .min(1, "Select at least one role")
        .required("Required"),
    }),
    onSubmit: (values) => {
      const registerRequestBody: RegisterRequestBody = {
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        password: values.password,
        email: values.email,
        role: new Set(values.role),
      };
      console.log(registerRequestBody);

      registerRequest(registerRequestBody).then((data) => {
        const { access_token, role, username } = data;
        localStorage.setItem("auth", JSON.stringify({ accessToken: access_token, role, username }));
        setAuth({ accessToken: access_token, role, username });
        navigate(from);
      }
      ).catch((err) => {
        console.error(err);
        setFormError(err);
       });
    },
  });

  if (accessToken) {
    console.log("Already logged in");
    navigate(from);
  }

  return (
    
        <Row className="mt-5 justify-content-center align-items-center">
          <Col  md={{ span: 6 }}>
            <Card>
              <Card.Header>Register</Card.Header>
              <Card.Body>
                <Form onSubmit={formik.handleSubmit}>
                  {formError && <div className="alert alert-danger">{formError}</div>}
                  <Row>
                    <Form.Group
                      as={Col}
                      md={6}
                      xs={12}
                      className="mb-3"
                      controlId="formBasicFirstName"
                    >
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        isInvalid={
                          !!formik.touched.firstName &&
                          !!formik.errors.firstName
                        }
                        {...formik.getFieldProps("firstName")}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md={6}
                      xs={12}
                      className="mb-3"
                      controlId="formBasicLastName"
                    >
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter last name"
                        isInvalid={
                          !!formik.touched.lastName && !!formik.errors.lastName
                        }
                        {...formik.getFieldProps("lastName")}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
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
                  <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <FormikPasswordField fieldName="confirmPassword" placeholder="Confirm Password" formik={formik} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      isInvalid={
                        !!formik.touched.email && !!formik.errors.email
                      }
                      {...formik.getFieldProps("email")}
                    />

                    <Form.Control.Feedback type="invalid">
                      {formik.errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicRole">
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                      multiple
                      isInvalid={!!formik.touched.role && !!formik.errors.role}
                      {...formik.getFieldProps("role")}
                    >
                      <option value="ROLE_USER">User</option>
                      <option value="ROLE_MOD">Moderator</option>
                      <option value="ROLE_ADMIN">Admin</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.role}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className="d-grid gap-2">
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

  );
};

export default Register;
