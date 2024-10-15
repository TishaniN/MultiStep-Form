import React from 'react';
import styles from '../styles/ProgressBar.module.css'; // Importing the CSS module

const ProgressBar = ({ step }) => {
  return (
    <div className={styles.progressBar}>
      {[1, 2, 3, 4, 5].map((num, index) => (
        <React.Fragment key={num}>
          <div
            className={`${styles.circle} ${step >= num ? styles.active : ''}`}
          >
            {num}
          </div>
          {index < 4 && (
            <div
              className={`${styles.line} ${step > num ? styles.active : ''}`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressBar;
