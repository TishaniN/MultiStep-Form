"use client";  // This tells Next.js that this is a client-side component

import React, { useState, useEffect } from 'react';
import styles from '../styles/step1.module.css';  // Import CSS

const Step1 = ({ nextStep, updateFormData, formData }) => {
  // Initialize the state using formData if it exists, otherwise use empty values
  const [firstName, setFirstName] = useState(formData.firstName || '');
  const [lastName, setLastName] = useState(formData.lastName || '');
  const [submitForAnother, setSubmitForAnother] = useState(formData.submitForAnother || false);
  const [relationship, setRelationship] = useState(formData.relationship || '');
  const [age, setAge] = useState(formData.age || { mm: '', dd: '', yyyy: '' });
  const [hasDisability, setHasDisability] = useState(formData.hasDisability || false);
  const [disabilityFile, setDisabilityFile] = useState(formData.disabilityFile || null);

  // Helper function to check if all required fields are filled
  const isFormValid = () => {
    const isApplicantNameValid = firstName.trim() !== '' && lastName.trim() !== '';
    const isAgeValid = age.mm.trim() !== '' && age.dd.trim() !== '' && age.yyyy.trim() !== '';
    const isRelationshipValid = submitForAnother ? relationship.trim() !== '' : true;
    
    return isApplicantNameValid && isAgeValid && isRelationshipValid;
  };

  // Save the form data when the component is about to navigate to the next step
  const handleNext = () => {
    // Only proceed if the form is valid
    if (isFormValid()) {
      // Update formData in the parent component with the current data
      updateFormData({
        firstName,
        lastName,
        submitForAnother,
        relationship,
        age,
        hasDisability,
        disabilityFile,
      });

      // Proceed to the next step
      nextStep();
    }
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setDisabilityFile(e.target.files[0]);
  };

  return (
    <form className={styles['form-container']} onSubmit={(e) => e.preventDefault()}>
      {/* Form heading */}
      <h2 className={styles['header']}>1. Your Information</h2>

      {/* Applicant's name input fields */}
      <label className={styles['label']} htmlFor="applicant-name">
        Applicant's Name <span className={styles['spn']}>*</span>
      </label>
      <input
        type="text"
        className={styles['text-input']}
        id="first-name"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        className={styles['text-input']}
        id="last-name"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      {/* Checkbox for submitting on behalf of someone else */}
      <label>
        <input
          type="checkbox"
          className={styles['checkbox-input']}
          checked={submitForAnother}
          onChange={() => setSubmitForAnother(!submitForAnother)}  // Toggle state on checkbox click
        />
        Are you submitting this application on behalf of someone else?
      </label>

      {/* Extra fields if submitting on behalf of someone else */}
      {submitForAnother && (
        <div className={styles['requester-info']}>
          <label className={styles['label']} htmlFor="requester-first-name">
            If yes, please provide your information below:
          </label>
          <input
            type="text"
            className={styles['text-input']}
            placeholder="First Name"
            value={formData.requesterFirstName || ''}  // Use formData for pre-filled values
            onChange={(e) => updateFormData({ requesterFirstName: e.target.value })}
          />
          <input
            type="text"
            className={styles['text-input']}
            placeholder="Last Name"
            value={formData.requesterLastName || ''}
            onChange={(e) => updateFormData({ requesterLastName: e.target.value })}
          />

          {/* Relationship dropdown */}
          <label className={styles['label']} htmlFor="relationship">Relationship to applicant:</label>
          <select
            id="relationship"
            className={styles['select-input']}
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
          >
            <option value="">Relationship</option>
            <option value="parent">Parent</option>
            <option value="guardian">Guardian</option>
            <option value="other">Other</option>
          </select>
        </div>
      )}

      {/* Age input */}
      <label className={styles['label']} htmlFor="age">
        {submitForAnother ? 'Age of Applicant' : 'Age'} <span className={styles['spn']}>*</span>
      </label>
      <div className={styles['date-inputs']}>
        <input
          type="text"
          className={styles['text-input']}
          placeholder="MM"
          value={age.mm}
          onChange={(e) => setAge({ ...age, mm: e.target.value })}
        />
        <input
          type="text"
          className={styles['text-input']}
          placeholder="DD"
          value={age.dd}
          onChange={(e) => setAge({ ...age, dd: e.target.value })}
        />
        <input
          type="text"
          className={styles['text-input']}
          placeholder="YYYY"
          value={age.yyyy}
          onChange={(e) => setAge({ ...age, yyyy: e.target.value })}
        />
      </div>

      {/* Disability question */}
      <label className={styles['label']}>
        {submitForAnother ? 'Does the applicant have a disability?' : 'Do you have a disability?'} <span className={styles['spn']}>*</span>
      </label>
      <label>
        <input
          type="radio"
          name="disability"
          className={styles['radio-input']}
          value="yes"
          checked={hasDisability}
          onChange={() => setHasDisability(true)}  // Set disability to true
        />
        Yes
      </label>
      <label>
        <input
          type="radio"
          name="disability"
          className={styles['radio-input']}
          value="no"
          checked={!hasDisability}
          onChange={() => setHasDisability(false)}  // Set disability to false
        />
        No
      </label>

      {/* File upload section, disabled if no disability */}
      <div>
        <label className={styles['label']}>
          If {submitForAnother ? 'the applicant' : 'you'} have a disability, please upload documentation:
        </label>
        <input
          type="file"
          disabled={!hasDisability}
          className={styles['file-input']}
          onChange={handleFileChange}
        />
        <button type="button" disabled={!hasDisability} className={styles['upload-button']}>Upload</button>
      </div>

      <div className={styles.navigationContainer}>
        <p className={styles.requiredNotice}>
          Fields that include a <span className={styles.spn}>*</span> are required
        </p>
        <div className={styles.buttonContainer}>
          <button type="button" className={styles['back-button']}>Back</button>
          <button type="button" className={styles['next-button']} disabled={!isFormValid()} onClick={handleNext}> Next Step </button>
        </div>
      </div>

    </form>
  );
};

export default Step1;
