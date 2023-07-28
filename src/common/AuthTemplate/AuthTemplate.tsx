import { ReactNode } from "react";
import styles from "./AuthTemplate.module.scss";
import SignInIllustration from "../../assets/sign-in-illustration.png";

export type AuthTemplateProps = {
  children: ReactNode;
};

// Creates a template for content and navigation depending on auth status

const AuthTemplate = ({ children }: AuthTemplateProps) => {
  return (
    <div className={styles.signInContainer}>
      <div className={styles.imageContainer}>
        <img src={SignInIllustration} alt="" />
        <a href="https://storyset.com/online">
          Online illustrations by Storyset
        </a>
      </div>

      <div className={styles.formContainer}>{children}</div>
    </div>
  );
};

export default AuthTemplate;
