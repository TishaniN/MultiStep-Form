"use client"; // Ensure client-side rendering for components that use hooks

import React, { useState } from 'react'; // Import useState
import ProgressBar from './components/ProgressBar'; 
import Step1 from './pages/step1'; // Import Step1 from the pages directory
import Step2 from './pages/step2'; 
import Step3 from './pages/step3'; 
import Step4 from './pages/step4'; 
import Step5 from './pages/step5'; 


const Home = () => {
  const [formData, setFormData] = useState({});  // Initialize formData as an empty object
  const [step, setStep] = useState(1);

  // Function to update the form data dynamically
  const updateFormData = (newData) => {
    setFormData(prevData => ({
      ...prevData,
      ...newData  // Merge new data into existing formData
    }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  // Function to render the current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 nextStep={nextStep} updateFormData={updateFormData} formData={formData} />;
      case 2:
        return <Step2 nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} formData={formData} />;
      case 3:
        return <Step3 nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} formData={formData} />;
      case 4:
        return <Step4 nextStep={nextStep} prevStep={prevStep} formData={formData} />;
      case 5:
        return <Step5 />;
      default:
        return <Step1 nextStep={nextStep} updateFormData={updateFormData} formData={formData} />;
    }
  };

  return (
    <div className="form-container">
      <ProgressBar step={step} />
      {renderStep()}
    </div>
  );
};

export default Home;
