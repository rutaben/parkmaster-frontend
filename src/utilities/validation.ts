import { Input } from "../hooks/useInputValidation";

// Regular expression used in this function checks if the email address has a valid format, including username, "@" symbol, domain name, and top-level domain
export const isValidEmail = (email: string): boolean => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(email.toLowerCase());
};

// Checks if two password inputs match in a form
export const arePasswordsMatching = (value: string, inputs?: Input[]) => {
  if (!inputs) {
    return;
  }

  const passwordInput = inputs.find((input) => input.name === "password");

  if (value !== passwordInput?.value) {
    return "Passwords must match";
  }

  return undefined;
};
