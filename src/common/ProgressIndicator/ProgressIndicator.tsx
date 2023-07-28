import { useEffect, useState } from "react";
import styles from "./ProgressIndicator.module.scss";
import LinearProgress from "@mui/material/LinearProgress";

const ProgressIndicator = () => {
  const [progress, setProgress] = useState(0);

// Returns a progress bar with simulated loading

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={styles.progressIndicatorContainer}>
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
};

export default ProgressIndicator;
