import React from 'react';
import styles from '../styles/step5.module.css'; // Import the CSS for styling

const Step5 = () => {

  // Function to handle "Print Confirmation" button
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Thank You For Submitting Your Application</h2>

      {/* Confirmation message */}
      <p className={styles.message}>
        Thank you for submitting your application. A confirmation email has been sent to the email address you provided.
        Please retain this for your records.
      </p>

      <p className={styles.message}>
        If you have any inquiries or require assistance regarding your application, you may contact us during business hours at 
        <a href="tel:1-800-123-4567" className={styles.link}> 1-800-123-4567 </a> 
        or via email at 
        <a href="mailto:support@email.com" className={styles.link}> support@email.com</a>.
        We appreciate your interest in the Meals on Wheels program, dedicated to supporting individuals in need of supplemental meal services.

      </p>

      {/* Privacy notice */}
      <p className={styles.privacyNotice}>
        Privacy Notice: Your personal information will be kept confidential and used only for processing your application. 
        It will not be shared with third parties without your consent.
      </p>

      {/* Action buttons */}
      <div className={styles.buttons}>
        <button className={styles.homeBtn} onClick={() => window.location.href = '/'}>Return To Homepage</button>
        <button className={styles.printBtn} onClick={handlePrint}>Print Confirmation</button>
      </div>
    </div>
  );
};

export default Step5;
