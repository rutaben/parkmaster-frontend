import { CSSProperties } from "react";
import styles from "./Loader.module.scss";
import { GridLoader } from "react-spinners";

export type LoaderProps = {
  isLoading: boolean;
};

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

// Returns a styled loader
const Loader = ({ isLoading }: LoaderProps) => {
  return (
    <div className={styles.loader}>
      <GridLoader
        color="rgb(125, 136, 222)"
        loading={isLoading}
        cssOverride={override}
        size={10}
      />
    </div>
  );
};

export default Loader;
