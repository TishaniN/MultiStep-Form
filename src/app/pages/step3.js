import React, { useState, useEffect } from 'react';
import styles from '../styles/step3.module.css'; // Import the CSS file

const Step3 = ({ nextStep, prevStep, formData, updateFormData }) => {
  // Set up state to store the address information
  const [address, setAddress] = useState({
    street: formData.address?.street || '',  // Use values from formData if available, otherwise use an empty string
    city: formData.address?.city || '',
    state: formData.address?.state || '',
    postal: formData.address?.postal || '',
    country: formData.address?.country || 'Sri Lanka',  // Default value is 'Sri Lanka'
  });

  // Set up state to store the contact information
  const [contactInfo, setContactInfo] = useState({
    areaCode: formData.contactInfo?.areaCode || '',
    centralOfficeCode: formData.contactInfo?.centralOfficeCode || '',
    lineNumber: formData.contactInfo?.lineNumber || '',
    secondaryAreaCode: formData.contactInfo?.secondaryAreaCode || '',
    secondaryCentralOfficeCode: formData.contactInfo?.secondaryCentralOfficeCode || '',
    secondaryLineNumber: formData.contactInfo?.secondaryLineNumber || '',
    email: formData.contactInfo?.email || '',
  });

  // Set up state to store delivery instructions
  const [deliveryInstructions, setDeliveryInstructions] = useState(
    formData.deliveryInstructions || '' // Use the value from formData or an empty string
  );

  // This function updates the address state when the user types in the input fields
  const handleAddressChange = (e) => {
    const { name, value } = e.target;  // Get the name and value of the field that changed
    setAddress({ ...address, [name]: value });  // Update the specific address field
  };

  // This function updates the contact information state when the user types in the input fields
  const handleContactChange = (e) => {
    const { name, value } = e.target;  // Get the name and value of the field that changed
    setContactInfo({ ...contactInfo, [name]: value });  // Update the specific contact field
  };

  // This function checks if the required form fields are filled
  const isFormValid = () => {
    // The form is valid if all required fields are not empty
    return (
      address.street.trim() !== '' &&
      contactInfo.areaCode.trim() !== '' &&
      contactInfo.centralOfficeCode.trim() !== '' &&
      contactInfo.lineNumber.trim() !== '' &&
      contactInfo.email.trim() !== ''
    );
  };

  // Save the updated form data whenever the user changes the address, contact info, or delivery instructions
  useEffect(() => {
    updateFormData({
      address,
      contactInfo,
      deliveryInstructions,
    });
  }, [address, contactInfo, deliveryInstructions, updateFormData]);

  return (
    <div className={styles['container']}>
      <h2 className={styles['title']}>3. Delivery and Contact Information</h2>

      {/* Section for entering the delivery address */}
      <div className={styles['section']}>
        <label className={styles['label']}>
          Delivery Address <span className={styles['spn']}>*</span>
        </label>
        <input
          type="text"
          name="street"
          className={styles['inputSN']}
          placeholder="Street Name"
          value={address.street}  // Set the input value to the current street value in the state
          onChange={handleAddressChange}  // Call handleAddressChange when the input changes
        />
        <input
          type="text"
          name="apartment"
          className={styles['inputAp']}
          placeholder="Apartment, Suite, Etc"
          value={address.apartment}  // Handle the apartment field
          onChange={handleAddressChange}
        />
        <input
          type="text"
          name="city"
          className={styles['inputC']}
          placeholder="City"
          value={address.city}
          onChange={handleAddressChange}
        />
        <input
          type="text"
          name="state"
          className={styles['inputC']}
          placeholder="State"
          value={address.state}
          onChange={handleAddressChange}
        />
        <input
          type="text"
          name="postal"
          className={styles['inputC']}
          placeholder="Postal / Zip Code"
          value={address.postal}
          onChange={handleAddressChange}
        />
        <select name="country" className={styles['inputCou']} value={address.country} disabled>
          <option value="Sri Lanka">Sri Lanka</option>
        </select>
        <label className={styles['label']} htmlFor="delivery-instructions">
          Delivery Instructions (optional)
        </label>
        <textarea
          className={styles['textarea']}
          placeholder="-ie., condo gate, phone first, dog will eat you"
          value={deliveryInstructions}  // Set the textarea value to the current deliveryInstructions
          onChange={(e) => setDeliveryInstructions(e.target.value)}  // Update delivery instructions
          maxLength={75}
        />
      </div>

      {/* Section for entering contact information */}
      <div className={styles['section']}>
        <label className={styles['label']}>
          Contact Information <span className={styles['spn']}>*</span>
        </label>
        <label className={styles['label']}>Phone Number</label>
        <div className={styles['phoneContainer']}>
          <input
            type="text"
            name="areaCode"
            className={styles['phoneInput']}
            placeholder="XXX"
            maxLength="3"
            value={contactInfo.areaCode}  // Handle the area code field
            onChange={handleContactChange}
          />
          <span className={styles['dash']}>-</span>
          <input
            type="text"
            name="centralOfficeCode"
            className={styles['phoneInput']}
            placeholder="XXX"
            maxLength="3"
            value={contactInfo.centralOfficeCode}
            onChange={handleContactChange}
          />
          <span className={styles['dash']}>-</span>
          <input
            type="text"
            name="lineNumber"
            className={styles['phoneInput']}
            placeholder="XXXX"
            maxLength="4"
            value={contactInfo.lineNumber}
            onChange={handleContactChange}
          />
        </div>

        {/* Secondary phone number */}
        <label className={styles['label']}>Secondary Phone Number</label>
        <div className={styles['phoneContainer']}>
          <input
            type="text"
            name="secondaryAreaCode"
            className={styles['phoneInput']}
            placeholder="XXX"
            maxLength="3"
            value={contactInfo.secondaryAreaCode}
            onChange={handleContactChange}
          />
          <span className={styles['dash']}>-</span>
          <input
            type="text"
            name="secondaryCentralOfficeCode"
            className={styles['phoneInput']}
            placeholder="XXX"
            maxLength="3"
            value={contactInfo.secondaryCentralOfficeCode}
            onChange={handleContactChange}
          />
          <span className={styles['dash']}>-</span>
          <input
            type="text"
            name="secondaryLineNumber"
            className={styles['phoneInput']}
            placeholder="XXXX"
            maxLength="4"
            value={contactInfo.secondaryLineNumber}
            onChange={handleContactChange}
          />
        </div>

        {/* Email */}
        <label className={styles['label']}>
          Email <span className={styles['spn']}>*</span>
        </label>
        <input
          type="email"
          name="email"
          className={styles['input']}
          placeholder="applicant.email@email.com"
          value={contactInfo.email}
          onChange={handleContactChange}
        />
      </div>

      {/* Section for navigation buttons */}
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

export default Step3;
