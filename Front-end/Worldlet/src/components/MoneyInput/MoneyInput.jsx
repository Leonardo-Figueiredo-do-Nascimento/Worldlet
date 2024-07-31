import React, { useState } from 'react';

const MoneyInput = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(formatMoney(value || 0));

  // Format the number as a monetary value
  function formatMoney(value) {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  // Handle input change
  const handleChange = (e) => {
    let newValue = e.target.value;

    // Remove any non-numeric characters except for the decimal point
    newValue = newValue.replace(/[^0-9.]/g, '');

    // Convert to number and format
    const numericValue = parseFloat(newValue);

    // Prevent invalid numeric values
    if (!isNaN(numericValue)) {
      setInputValue(formatMoney(numericValue));
      onChange(numericValue);
    } else {
      setInputValue('');
      onChange(0);
    }
  };
  const inputStyle = {
    height:'auto',
    width:'auto',
    textAlign:'end',
  };
  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleChange}
      style={inputStyle}
    />
  );
};

export default MoneyInput;