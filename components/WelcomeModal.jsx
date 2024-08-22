import React, { useState, useEffect } from 'react';
import './WelcomeModal.css';

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Welcome to the Dynamic Form Generator</h2>
          <p>Some instructions:</p>
          <ul>
            <li>Choose your type of fields on the left side.</li>
            <li>
              In the "Customize Field Accordingly" section, fill in the field name, validations, and options (if applicable).
            </li>
            <li>
              In the "Form Preview" section on the right, you will see the form you have built along with a submit button.
            </li>
            <li>
              If you have saved the previous configuration in the local storage then you will see that configuration even after page refresh.
            </li>
          </ul>
          <button onClick={closeModal}>Got it!</button>
        </div>
      </div>
    )
  );
};

export default WelcomeModal;
