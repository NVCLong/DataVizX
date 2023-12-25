import React from 'react';
import './ButtonImplement.css'; // Import the CSS file for styling

const ButtonImplement= ({ onClick, children }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(); // Trigger the onClick action if provided
    }
  };

  return (
    <button className="custom-button" onClick={handleClick}>
      {children} Generate
    </button>
  );
};

export default ButtonImplement;
