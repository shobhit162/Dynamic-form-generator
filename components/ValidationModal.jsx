import React, { useState } from 'react';
import './ValidationModal.css';

const ValidationModal = ({ onSave, onClose, type }) => {
  const [isRequired, setIsRequired] = useState(false);
  const [minLength, setMinLength] = useState('');
  const [maxLength, setMaxLength] = useState('');
  const [format, setFormat] = useState('');

  const handleSave = () => {
    const validations = {};

    if (isRequired) validations.required = true;
    if (minLength) validations.minLength = parseInt(minLength, 10);
    if (maxLength) validations.maxLength = parseInt(maxLength, 10);
    if (format) validations.format = format;

    onSave(validations);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Set Validation Rules</h3>

        <div className="form-group">
          <label>
            <div style={{display: 'flex'}}>
            Required
            <input
              style={{width: '40px'}}
              type="checkbox"
              checked={isRequired}
              onChange={(e) => setIsRequired(e.target.checked)}
            />
            </div>
          </label>
        </div>

        {(type === 'text' || type === 'textarea') && <div className="form-group">
          <label>Min Length</label>
          <input
            type="number"
            value={minLength}
            onChange={(e) => setMinLength(e.target.value)}
            min="0"
          />
        </div>}

        {(type === 'text' || type === 'textarea') && <div className="form-group">
          <label>Max Length</label>
          <input
            type="number"
            value={maxLength}
            onChange={(e) => setMaxLength(e.target.value)}
            min="0"
          />
        </div>}

        {type === 'text' && <div className="form-group">
          <label>Format</label>
          <select value={format} onChange={(e) => setFormat(e.target.value)}>
            <option value="">None</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
        </div>}

        <div className="modal-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ValidationModal;
