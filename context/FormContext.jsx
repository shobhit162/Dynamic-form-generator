import React, { createContext, useState } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [fields, setFields] = useState([]);

  return (
    <FormContext.Provider value={{ fields, setFields }}>
      {children}
    </FormContext.Provider>
  );
};
