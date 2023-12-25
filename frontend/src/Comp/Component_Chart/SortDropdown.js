import React, { useState } from 'react';
import './SortDropdown.css';

const SortDropdown = ({ handleSort }) => {
  const [selectedOption, setSelectedOption] = useState('none');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);// Gọi hàm xử lý sắp xếp từ component cha
  };

  return (
    <div className='sort-container'>
      <h3>Sắp xếp:</h3>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="none">Không sắp xếp</option>
        <option value="ascending">Tăng dần</option>
        <option value="descending">Giảm dần</option>
      </select>
    </div>
  );
};

export default SortDropdown;
