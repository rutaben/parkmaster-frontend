import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./SignInForm.module.scss";
import { TextField } from "@mui/material";
import Form from "../../../common/Form/Form";
import Button from "../../../common/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../../routing/routes";
import { useDispatch, useSelector } from "react-redux";
import { AuthStateType, resetSignInError } from "../../../store/auth/reducer";
import { AppDispatch } from "../../Settings/FeeSettingForm/FeeSettingForm";
import { signIn } from "../../../store/auth/actions";
import { isValidEmail } from "../../../utilities/validation";
import { Input, useInputValidation } from "../../../hooks/useInputValidation";

const SignInForm = () => {
  const navigate = useNavigate();
  const { signInError, isAuthenticated } = useSelector(
    (state: { auth: AuthStateType }) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (signInError) {
      dispatch(resetSignInError());
    }
  }, [signInError, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      return navigate(routes.vehicles);
    }
  }, [isAuthenticated, navigate]);

  const initialInputs: Input[] = [
    {
      name: "email",
      label: "Enter email",
      type: "email",
      value: "",
      validations: [
        (value) => (!value ? "Email is required" : undefined),
        (value) => (isValidEmail(value) ? undefined : "Invalid email format"),
      ],
      error: null,
    },
    {
      name: "password",
      label: "Enter password",
      type: "password",
      value: "",
      validations: [
        (value) => (!value ? "Password is required" : undefined),
        (value) =>
          value.length >= 8
            ? undefined
            : "Password must be at least 8 characters",
      ],
      error: null,
    },
  ];

  const { inputs, handleOnInputChange } = useInputValidation(initialInputs);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // Checks if there are any errors before submitting
    const hasErrors = inputs.some((input) => !!input.error);

    if (!hasErrors) {
      dispatch(signIn({ email: inputs[0].value, password: inputs[1].value }));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>
        Sign In to <span>packmaster</span>
      </h1>
      <div className={styles.mainInputs}>
        {inputs.map((input) => (
          <TextField
            name={input.name}
            key={input.name}
            onChange={handleOnInputChange}
            value={input.value}
            label={input.label}
            error={!!input.error}
            helperText={input.error}
            type={input.type}
            required
          />
        ))}
        <Button type="submit">Sign In</Button>
      </div>
      <hr />
      <Link className={styles.link} to={routes.signUp}>
        Or Sign Up here
      </Link>
    </Form>
  );
};

export default SignInForm;
