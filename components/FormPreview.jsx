import React, { useContext, useState } from 'react';
import { FormContext } from '../context/FormContext';
import '../App.css';

const FormPreview = () => {
  const { fields } = useContext(FormContext);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e, field) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [field.label]: value,
    });
  };

  const validateField = (field, value) => {
    const errorMessages = [];

    if (field.validations) {
      if (field.validations.required && !value) {
        errorMessages.push(`${field.label} value is required`);
      }
      if (field.validations.minLength && value.length < field.validations.minLength) {
        errorMessages.push(`${field.label} value must be at least ${field.validations.minLength} characters`);
      }
      if (field.validations.maxLength && value.length > field.validations.maxLength) {
        errorMessages.push(`${field.label} value must be at most ${field.validations.maxLength} characters`);
      }
      if (field.validations.format === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errorMessages.push(`${field.label} value must be a valid email`);
        }
      }
      if (field.validations.format === 'phone' && value) {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(value)) {
          errorMessages.push(`${field.label} value must be a valid phone number`);
        }
      }
    }

    return errorMessages;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    fields.forEach((field) => {
      const value = formData[field.label] || '';
      const errorMessages = validateField(field, value);
      if (errorMessages.length > 0) {
        newErrors[field.label] = errorMessages;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert(JSON.stringify(formData, null, 2));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-preview">
      <h2>Form Preview</h2>
      {fields.map((field, index) => (
        <div key={index} className={field.type === 'checkbox'? 'form-group-for-checkbox' : 'form-group'}>
          <label>{field.label}{field.validations?.required && <span className="required">*</span>}</label>
          {field.type === 'text' && (
            <input
              type="text"
              value={formData[field.label] || ''}
              onChange={(e) => handleChange(e, field)}
              id={errors[field.label] ? 'errorId' : ''}
            />
          )}
          {field.type === 'textarea' && (
            <textarea
              value={formData[field.label] || ''}
              onChange={(e) => handleChange(e, field)}
              id={errors[field.label] ? 'errorId' : ''}
              style={{width: '100%'}}
            />
          )}
          {field.type === 'dropdown' && (
            <select
              value={formData[field.label] || ''}
              onChange={(e) => handleChange(e, field)}
              id={errors[field.label] ? 'errorId' : ''}
            >
              <option value="">Select an option</option>
              {field.options.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          {field.type === 'checkbox' && (
            <input
              type="checkbox"
              checked={!!formData[field.label]}
              onChange={(e) => handleChange(e, field)}
              id={errors[field.label] ? 'errorId' : ''}
              style={{margin: '0 0 0 10px'}}
            />
          )}
          {field.type === 'radio' &&
            field.options.map((option, idx) => (
              <div key={idx} style={{display: 'flex'}}>
                <input
                  type="radio"
                  name={field.label}
                  value={option}
                  onChange={(e) => handleChange(e, field)}
                  id={errors[field.label] ? 'errorId' : ''}
                  style={{width: '10px'}}
                />
                <label>{option}</label>
              </div>
            ))}
          {errors[field.label] && (
            <div className="error-message">
              {errors[field.label].map((error, idx) => (
                <div key={idx}>{error}</div>
              ))}
            </div>
          )}
        </div>
      ))}
      {fields.length > 0 && <button type="submit" className="submit-button">
        Submit
      </button>}
    </form>
  );
};

export default FormPreview;
