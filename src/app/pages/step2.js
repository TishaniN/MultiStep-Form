import React, { useState, useEffect } from 'react';
import styles from '../styles/step2.module.css'; // Import the CSS module

const Step2 = ({ nextStep, prevStep, formData = {}, updateFormData }) => {  
  // Initialize the meal plan and daysRequested from formData, or use default values
  const [mealPlan, setMealPlan] = useState(formData.mealPlan || ''); // Default to an empty string if mealPlan is not in formData
  const [daysRequested, setDaysRequested] = useState(formData.daysRequested || []); // Default to an empty array

  const handleMealPlanChange = (e) => {
    const { value } = e.target;
    setMealPlan(value); // Update the mealPlan state

    if (value === 'Full 21 meals') {
      setDaysRequested(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
    } else {
      setDaysRequested([]); // Clear the selected days if another meal plan is chosen
    }
  };

  const handleDayChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setDaysRequested([...daysRequested, value]); // Add the selected day to the array
    } else {
      setDaysRequested(daysRequested.filter(day => day !== value)); // Remove the unselected day from the array
    }
  };

  // Save the form data when mealPlan or daysRequested changes
  useEffect(() => {
    updateFormData({
      mealPlan,
      daysRequested,
    });
  }, [mealPlan, daysRequested, updateFormData]); // Only run this effect when mealPlan or daysRequested changes

  const isFormValid = () => {
    // The form is valid if all required fields are not empty
    return (
      mealPlan.trim() !== '' && // Check if meal plan is selected
      (mealPlan === 'Full 21 meals' || daysRequested.length > 0) // Check if days are selected (unless 'Full 21 meals' is chosen)
    );
  };

  return (
    <div className={styles['container']}>
      {/* Title */}
      <h2 className={styles['title']}>2. Requested Services</h2>

      {/* Meal Plan Selection */}
      <div className={styles['radio-group']}>
        <label className={styles['labelM']}>
          Choose the Meal Plan you would like to receive: <span className={styles['spn']}>*</span>
        </label>
        <div>
          <input
            type="radio"
            name="mealPlan"
            value="Full 21 meals"
            className={styles['input']} // Apply the input class
            checked={mealPlan === 'Full 21 meals'} // Check if this option is selected
            onChange={handleMealPlanChange} // Call the handleMealPlanChange function when this option is selected
          />
          <label className={styles['label']}>Full 21 meals</label>
        </div>
        <div>
          <input
            type="radio"
            name="mealPlan"
            value="Lunch and Dinner"
            className={styles['input']}
            checked={mealPlan === 'Lunch and Dinner'} // Check if this option is selected
            onChange={handleMealPlanChange}
          />
          <label className={styles['label']}>Lunch and Dinner</label>
        </div>
        <div>
          <input
            type="radio"
            name="mealPlan"
            value="Only Dinner"
            className={styles['input']}
            checked={mealPlan === 'Only Dinner'} // Check if this option is selected
            onChange={handleMealPlanChange}
          />
          <label className={styles['label']}>Only Dinner</label>
        </div>
      </div>

      {/* Days Requested Section */}
      <div className={styles['checkbox-group']}>
        <label className={styles['labelM']}>
          Days Requested: <span className={styles['spn']}>*</span>
        </label>
        {/* Loop through each day of the week */}
        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
          <div key={day}>
            <input
              type="checkbox"
              value={day}
              className={styles['input']} // Apply the input class
              checked={daysRequested.includes(day)} // Check if this day is selected
              disabled={mealPlan === 'Full 21 meals'} // Disable the checkbox if 'Full 21 meals' is selected
              onChange={handleDayChange} // Call the handleDayChange function when this checkbox is toggled
            />
            <label className={styles['label']}>{day}</label>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className={styles['navigationContainer']}>
        <p className={styles['requiredNotice']}>
          Fields that include a <span className={styles['spn']}>*</span> are required
        </p>
        <div className={styles['buttonContainer']}>
          <button className={styles['back-button']} onClick={prevStep}>Back</button>
          <button className={styles['next-button']} onClick={nextStep} disabled={!isFormValid()}>Next Step</button>
        </div>
      </div>
    </div>
  );
};

export default Step2;
