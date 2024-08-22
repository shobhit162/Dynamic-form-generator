import React from 'react';
import FormBuilder from './components/FormBuilder';
import FormPreview from './components/FormPreview';
import WelcomeModal from './components/WelcomeModal';
import './App.css';

function App() {
  return (
    <div className="App">
      <WelcomeModal /> 
      <div className="page left">
        <FormBuilder />
      </div>
      <div className="page right">
        <FormPreview />
      </div>
    </div>
  );
}

export default App;
