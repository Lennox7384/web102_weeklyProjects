import React from 'react';

const InputForm = ({ userInput, onChange, onSubmit, disabled }) => {
  return (
    <div className="input-form">
      <input
        type="text"
        value={userInput}
        onChange={onChange}
        placeholder="Enter your answer..."
        disabled={disabled}
      />
      <button onClick={onSubmit} disabled={disabled}>Submit</button>
    </div>
  );
};

export default InputForm;