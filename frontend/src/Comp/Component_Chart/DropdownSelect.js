import React, { useState } from 'react';
import './DropdownSelect.css'; // Import the CSS file

const DropdownSelect = () => {
  const [selectedOption, setSelectedOption] = useState(''); // State to hold selected option

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value); // Update selected option in state
  };

  return (
    <div className="select-container">
      <h2 className="select-label">Chọn một lựa chọn:</h2>
      <select className="select-dropdown" value={selectedOption} onChange={handleSelectChange}>
        <option value="">Chọn một</option>
        <option value="Pie Chart" className="select-option">Pie Chart</option>
        <option value="Line Graph" className="select-option">Line Graph</option>
        <option value="Bar Chart" className="select-option">Bar Chart</option>
        <option value="Table" className="select-option">Table</option>
      </select>
      {selectedOption && <p>Bạn đã chọn: {selectedOption}</p>}
    </div>
  )
}

