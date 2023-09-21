import React from 'react';
import './Button.css';
import {
  IoHeartOutline,
  IoHeart
} from "react-icons/io5";

const Button = ({ appearance, children }) => {
  const classNames = `button ${appearance}`;

  return (
    <button className={classNames} >
      {children}
    </button>
  );
};

const LikeButton = ({ appearance, children }) => {
  const classNames = `button ${appearance}`;

  return (
    <button className={classNames} >
      {children}
    </button>
  );
}

export {
  Button,
  LikeButton
}