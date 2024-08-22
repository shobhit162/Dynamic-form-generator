import React, { useState } from 'react';
import ValidationModal from './ValidationModal';

const FormField = ({index, type, label, options, onFieldChange, validations, onRemove }) => {
  const [fieldLabel, setFieldLabel] = useState(label);
  const [fieldOptions, setFieldOptions] = useState(options || []);
  const [isValidationModalOpen, setValidationModalOpen] = useState(false);

  const handleLabelChange = (e) => {
    setFieldLabel(e.target.value);
    onFieldChange({ type, label: e.target.value, options: fieldOptions, validations }); // TODO here validation is also needed in array
  };

  const openValidationModal = () => {
    setValidationModalOpen(true);
  };

  const closeValidationModal = () => {
    setValidationModalOpen(false);
  };

  const handleValidationSave = (validations) => {
    onFieldChange({ type, label: fieldLabel, options: fieldOptions, validations });
    closeValidationModal();
  };

  const handleOptionsChange = (e, index) => {
    const newOptions = [...fieldOptions];
    newOptions[index] = e.target.value;
    setFieldOptions(newOptions);
    onFieldChange({ type, label: fieldLabel, options: newOptions, validations });
  };

  const addOption = () => {
    setFieldOptions([...fieldOptions, '']);
  };

  const renderField = () => {
    switch (type) {
      case 'dropdown':
        return (
          <>
            {fieldOptions.map((option, index) => (
              <div key={index} style={{marginLeft: '20px'}}>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionsChange(e, index)}
                  placeholder={`Option ${index + 1}`}
                />
              </div>
            ))}
            <button onClick={addOption}>Add Options</button>
          </>
        );
      case 'radio':
        return (
          <>
            {fieldOptions.map((option, index) => (
              <div key={index} style={{marginLeft: '20px'}}>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionsChange(e, index)}
                  placeholder={`Radio Label ${index + 1}`}
                />
              </div>
            ))}
            <button onClick={addOption}>Add Radio Button</button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div style={{display: 'block'}}>
      <span style={{marginRight: '10px'}}>{index + 1} </span>
      <input
        type="text"
        value={fieldLabel}
        onChange={handleLabelChange}
        placeholder="Field Label"
      />
      </div>
      <button onClick={openValidationModal}>Set Validations</button>
      <button onClick={onRemove}>Remove</button>
      {isValidationModalOpen && (
        <ValidationModal onSave={handleValidationSave} onClose={closeValidationModal} type={type}/>
      )}
      {renderField()}
    </div>
  );
};

export default FormField;