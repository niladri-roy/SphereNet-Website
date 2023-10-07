import React from 'react';
import './Button.css';

const Button = ({ appearance, children }) => {
  const classNames = `button ${appearance}`;

  return (
    <button className={classNames} >
      {children}
    </button>
  );
};

export default Button;