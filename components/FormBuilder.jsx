import React, { useState, useContext, useEffect } from 'react';
import FormField from './FormField';
import { FormContext } from '../context/FormContext';

const FormBuilder = () => {
  const { fields, setFields } = useContext(FormContext);
  const [fieldType, setFieldType] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedFields = localStorage.getItem('formFields');
    if (savedFields) {
      setFields(JSON.parse(savedFields));
    }
  }, [setFields]);

  const addField = () => {
    let newErrors = {};

    if (!fieldType) {
      newErrors.fieldType = "Please first select the type";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newField = { type: fieldType, label: '', options: [], validations: {} };
    setFields([...fields, newField]);
    setFieldType('');
    setErrors({});
  };

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleFieldChange = (index, updatedField) => {
    const newFields = fields.map((field, i) =>
      i === index ? updatedField : field
    );
    setFields(newFields);
  };

  const saveToLocalStorage = () => {
    localStorage.setItem('formFields', JSON.stringify(fields));
    alert('Configuration saved to local storage!');
  };

  const removeConfiguration = () => {
    localStorage.removeItem('formFields');
    setFields([]);
  };

  return (
    <div>
      <h2>Add Fields</h2>
      <div className='centerContent'>
      <div>
      <select
        value={fieldType}
        onChange={(e) => setFieldType(e.target.value)}
        className={errors.fieldType ? 'error' : ''}
      >
        <option value="">Select field type</option>
        <option value="text">Text</option>
        <option value="textarea">Textarea</option>
        <option value="dropdown">Dropdown</option>
        <option value="checkbox">Checkbox</option>
        <option value="radio">Radio Button</option>
      </select>
      {errors.fieldType && <div className="error-message">{errors.fieldType}</div>}
      </div>
      <div>
      <button onClick={addField}>Add Field</button>
      </div>
      </div>
      <h2>Customize Fields Accordingly</h2>
      {fields.map((field, index) => (
        <div key={index}>
          <FormField
            index={index}
            type={field.type}
            label={field.label}
            options={field.options}
            validations={field.validations}
            onFieldChange={(updatedField) => handleFieldChange(index, updatedField)}
            onRemove={() => removeField(index)}
          />
        </div>
      ))}
      {fields.length > 0 && <div className='centerContent borderUpper'>
      <button onClick={saveToLocalStorage}>Save configuration</button>
      <button onClick={removeConfiguration}>Remove configuration</button>
      </div>}
    </div>
  );
};

export default FormBuilder;
