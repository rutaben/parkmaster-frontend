import { FormEvent, ReactNode } from "react";
import styles from "./Form.module.scss";

type FormProps = {
  children: ReactNode;
  onSubmit: (event: FormEvent) => void;
};

// Returns a styled form wrapper
const Form = ({ children, onSubmit }: FormProps) => {
  return (
    <form
      onSubmit={(event) => onSubmit(event)}
      autoComplete="off"
      noValidate
      className={styles.form}
    >
      {children}
    </form>
  );
};

export default Form;
