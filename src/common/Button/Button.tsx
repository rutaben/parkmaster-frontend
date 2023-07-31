import { ReactNode } from "react";
import styles from "./Button.module.scss";
import { Button as MuiButton } from "@mui/material";
import cx from "classnames";

export type Props = {
  children?: ReactNode;
  className?: string;
  onClick?: (event: any) => void;
  startIcon?: string | ReactNode;
  type?: "submit";
  isDisabled?: boolean;
  isActive?: boolean;
  disableRipple?: boolean;
};

// Returns a custom styled button depending on a props passed
const Button = ({
  children,
  className,
  onClick,
  startIcon,
  type,
  isDisabled,
  disableRipple,
}: Props) => (
  <MuiButton
    className={cx(styles.button, className, {
      [styles.disabledButton]: isDisabled,
    })}
    onClick={onClick}
    startIcon={startIcon}
    disabled={isDisabled}
    disableRipple={disableRipple}
    type={type}
  >
    {children}
  </MuiButton>
);

export default Button;
