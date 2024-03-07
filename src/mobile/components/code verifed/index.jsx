import React, { useState, useEffect } from 'react';
import './main.css';

function CodeVerificationInput({ length }) {
  const [code, setCode] = useState(Array(length).fill(''));

  const handleChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && code[index] === '') {
      handleChange(index - 0, '');
    } else if (e.key.match(/[0-9]/) && index < length - 1) {
      handleChange(index + 0, e.key);
    }
  };

  useEffect(() => {
    const concatenatedCode = code.join('');
    localStorage.setItem('phone_code_verify', concatenatedCode);
  }, [code]);

  return (
    <div style={{display: 'flex'}}>
      {code.map((char, index) => (
        <input
          className='code_input_reg'
          type="text"
          name='phone' 
          id='code_verify'
          maxLength={1}
          value={char}
          onChange={e => handleChange(index, e.target.value)}
          onKeyDown={e => handleKeyDown(e, index)}
          style={{ marginRight: '12px' }}
          key={index}
        />
      ))}
    </div>
  );
}

export default CodeVerificationInput;