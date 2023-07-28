import { ReactElement, ReactNode } from "react";
import styles from "./ContentTemplate.module.scss";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

export type ContentTemplateProps = {
  title: string;
  topActions?: Array<any>;
  children: ReactNode;
};

// Template for authenticated user content

const ContentTemplate = ({
  title,
  children,
  topActions,
}: ContentTemplateProps): ReactElement => {
  const navigate = useNavigate();

  return (
    <div className={styles.contentContainer}>
      <div className={styles.topContainer}>
        <h2>{title}</h2>
        <div className={styles.buttonContainer}>
          {topActions
            ? topActions.map(({ path, title }) => (
                <Button key={title} onClick={() => navigate(path)}>
                  {title}
                </Button>
              ))
            : null}
        </div>
      </div>
      {children}
    </div>
  );
};

export default ContentTemplate;
