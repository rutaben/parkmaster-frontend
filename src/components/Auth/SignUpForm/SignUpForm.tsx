import { FormEvent, useEffect } from "react";
import styles from "./SignUpForm.module.scss";
import { TextField } from "@mui/material";
import Form from "../../../common/Form/Form";
import Button from "../../../common/Button/Button";
import { Link } from "react-router-dom";
import { routes } from "../../../routing/routes";
import { useDispatch, useSelector } from "react-redux";
import { AuthStateType, resetSignUpError } from "../../../store/auth/reducer";
import { AppDispatch } from "../../Settings/FeeSettingForm/FeeSettingForm";
import { signUp } from "../../../store/auth/actions";
import {
  arePasswordsMatching,
  isValidEmail,
} from "../../../utilities/validation";
import { Input, useInputValidation } from "../../../hooks/useInputValidation";
import { statusToast } from "../../../utilities/statusToast";
import { transformError } from "../../../utilities/errorTransform";

const SignUpForm = () => {
  const { signUpError, signUpSuccess } = useSelector(
    (state: { auth: AuthStateType }) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (signUpSuccess) {
      statusToast(
        "Sign Up was successful. Please Sign In with your credentials"
      );
    }
  }, [signUpSuccess, dispatch]);

  useEffect(() => {
    if (signUpError) {
      dispatch(resetSignUpError());

      // TODO: set up service to handle request status with error messages (and provide exceptions messages in BE)
      statusToast(transformError("Sign Up was unsuccessful"), true);
    }
  }, [signUpError, dispatch]);

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
    {
      name: "confirmPassword",
      label: "Enter password",
      type: "password",
      value: "",
      validations: [
        (value) => (!value ? "Password is required" : undefined),
        (value) =>
          value.length >= 8
            ? undefined
            : "Password must be at least 8 characters",
        (value, inputs) => arePasswordsMatching(value, inputs),
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
      dispatch(
        signUp({
          email: inputs[0].value,
          password: inputs[1].value,
          confirmPassword: inputs[2].value,
        })
      );
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>
        Sign Up to <span>packmaster</span>
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
        <Button type="submit">Sign Up</Button>
      </div>
      <hr />
      <Link className={styles.link} to={routes.signIn}>
        Or Sign In here
      </Link>
    </Form>
  );
};

export default SignUpForm;
