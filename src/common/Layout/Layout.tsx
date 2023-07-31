import { ReactNode } from "react";
import styles from "./Layout.module.scss";
import Navigation from "../Navigation/Navigation";
import Sidebar from "../Sidebar/Sidebar";

export type Props = {
  isAuthenticated: boolean;
  children: ReactNode;
};

// Returns styled layout depending on auth status
const Layout = ({ isAuthenticated, children }: Props) => {
  const getLayoutByAuthStatus = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
      return (
        <div className={styles.layoutContainer}>
          <Navigation />
          <Sidebar />
          <div className={styles.contentContainer}>
            <div className={styles.content}>{children}</div>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.layoutContainer}>
        <div className={styles.authenticationContent}>{children}</div>
      </div>
    );
  };

  return getLayoutByAuthStatus(isAuthenticated);
};

export default Layout;
