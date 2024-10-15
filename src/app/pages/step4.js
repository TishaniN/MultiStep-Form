import React, { useState } from 'react';
import styles from '../styles/step4.module.css'; // Import the CSS for styling

const Step4 = ({ prevStep, nextStep, formData = {} }) => {
  // States for the signature fields and error message
  const [signatureFirstName, setSignatureFirstName] = useState('');
  const [signatureLastName, setSignatureLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle the form submission
  const handleSubmit = () => {
    // Check if both the first name and last name are provided
    if (!signatureFirstName || !signatureLastName) {
      setErrorMessage('Please provide both your first and last name to sign the document.');
      return; // Stop the function if the names are not provided
    }

    // Check if the entered names match the names in formData from Step 1
    if (
      signatureFirstName.toLowerCase() !== (formData.firstName || '').toLowerCase() ||
      signatureLastName.toLowerCase() !== (formData.lastName || '').toLowerCase()
    ) {
      setErrorMessage('The signature does not match the applicant\'s name. Please correct it.');
      return; // Stop the function if the names don't match
    }

    // Clear the error message and go to the next step
    setErrorMessage('');
    nextStep(); // Call the nextStep function passed as a prop
  };

  return (
    <div className={styles['container']}>
      <h2 className={styles['title']}>Step 4: Review / Sign / Submit</h2>

      {/* Section to review the applicant's details */}
      <div className={styles['reviewSection']}>
        <p><strong>Applicant's Name:</strong> {formData.firstName} {formData.lastName}</p>
        <p><strong>Age:</strong> 
          {formData.age && `${formData.age.mm}/${formData.age.dd}/${formData.age.yyyy}`}
        </p>
        <p><strong>Do you have a disability?</strong> {formData.hasDisability ? 'Yes' : 'No'}</p>
        <p><strong>Disability Documentation Upload:</strong> {formData.disabilityFile}</p>

        <p><strong>Meal Plan Choice:</strong> {formData.mealPlan}</p>
        <p><strong>Days Requested:</strong> {formData.daysRequested && formData.daysRequested.join(', ')}</p>

        <p><strong>Delivery Address:</strong> 
          {formData.address && `${formData.address.street}, ${formData.address.city}, ${formData.address.state}, ${formData.address.postal}`}
        </p>
        <p><strong>Delivery Instructions:</strong> {formData.deliveryInstructions}</p>

        <p><strong>Phone Number:</strong> 
          {formData.contactInfo && `(${formData.contactInfo.areaCode}) ${formData.contactInfo.centralOfficeCode}-${formData.contactInfo.lineNumber}`}
        </p>
        <p><strong>Email:</strong> {formData.contactInfo && formData.contactInfo.email}</p>
      </div>

      {/* Section for the user to type their name as a signature */}
      <div className={styles['signSection']}>
        <label className={styles['label']}>Type Your Name Here to Virtually Sign the Document <span className={styles['spn']}>*</span></label>
        <div className={styles['inputRow']}>
          <input
            type="text"
            className={styles['input']}
            placeholder="First Name"
            value={signatureFirstName}
            onChange={(e) => setSignatureFirstName(e.target.value)} // Update the state when the user types
          />
          <input
            type="text"
            className={styles['input']}
            placeholder="Last Name"
            value={signatureLastName}
            onChange={(e) => setSignatureLastName(e.target.value)} // Update the state when the user types
          />
        </div>
        {/* Show an error message if there is one */}
        {errorMessage && <p className={styles['errorMessage']}>{errorMessage}</p>}
      </div>

      {/* Section for navigation buttons */}
      <div className={styles['navigationContainer']}>
        <p className={styles['requiredNotice']}>
          Fields that include a <span className={styles['spn']}>*</span> are required
        </p>
        <div className={styles['buttonContainer']}>
          <button className={styles['back-button']} onClick={prevStep}>Back</button>
          <button className={styles['next-button']} onClick={handleSubmit}>Next Step</button>
        </div>
      </div>
    </div>
  );
};

export default Step4;
