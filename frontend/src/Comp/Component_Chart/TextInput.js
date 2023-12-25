import React, { useState } from 'react';
import './TextInput.css'; // Import CSS file for styling

const TextInput = () => {
  const [inputValue, setInputValue] = useState(''); // State to hold input value

  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Update input value in state
  };

  return (
    <div className="text-input-container">
      <h2 className="input-label">Nhập dữ liệu:</h2>
      <input
        type="text"
        className="input-field"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Nhập vào đây..."
      />
      {inputValue && <p>Bạn đã nhập: {inputValue}</p>}
    </div>
  );
};

export default TextInput;
