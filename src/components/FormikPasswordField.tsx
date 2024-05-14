import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormikProps } from "formik";
import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";


interface PasswordInputProps{
  fieldName?: string,
  placeholder?:string,
  formik : FormikProps<any>
}

const FormikPasswordField: React.FC<PasswordInputProps> = ({ formik,fieldName="password",placeholder="Enter Password" }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <InputGroup>
        <Form.Control
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          isInvalid={!!formik.touched[fieldName] && !!formik.errors[fieldName]}
          {...formik.getFieldProps(fieldName)}
        />
        <InputGroup.Text onClick={togglePasswordVisibility}>
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </InputGroup.Text>
        <Form.Control.Feedback type="invalid">
          {formik.errors[fieldName] as string}
        </Form.Control.Feedback>
      </InputGroup>
  );
};
    
export default FormikPasswordField;