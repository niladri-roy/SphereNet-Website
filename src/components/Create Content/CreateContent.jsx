import React , { useState } from 'react'
import './CreateContent.css'

const CreateContent = () => {

  const [button1On, setButton1On] = useState(false);
  const [button2On, setButton2On] = useState(false);
  const [button3On, setButton3On] = useState(false);

  const [showDiv1, setShowDiv1] = useState(false);
  const [showDiv2, setShowDiv2] = useState(false);
  const [showDiv3, setShowDiv3] = useState(false);

  const handleButtonClick = (buttonNumber) => {
    setButton1On(buttonNumber === 1 ? !button1On : false);
    setButton2On(buttonNumber === 2 ? !button2On : false);
    setButton3On(buttonNumber === 3 ? !button3On : false);

    setShowDiv1(buttonNumber === 1 ? !showDiv1 : false);
    setShowDiv2(buttonNumber === 2 ? !showDiv2 : false);
    setShowDiv3(buttonNumber === 3 ? !showDiv3 : false);
  };

  return (
    <div>
      <button
        onClick={() => handleButtonClick(1)}
        className={button1On ? 'active' : ''}
      >
        Button 1: {button1On ? 'ON' : 'OFF'}
      </button>
      <button
        onClick={() => handleButtonClick(2)}
        className={button2On ? 'active' : ''}
      >
        Button 2: {button2On ? 'ON' : 'OFF'}
      </button>
      <button
        onClick={() => handleButtonClick(3)}
        className={button3On ? 'active' : ''}
      >
        Button 3: {button3On ? 'ON' : 'OFF'}
      </button>

      <div className={`content ${showDiv1 ? 'show' : ''}`}>Content for Button 1</div>
      <div className={`content ${showDiv2 ? 'show' : ''}`}>Content for Button 2</div>
      <div className={`content ${showDiv3 ? 'show' : ''}`}>Content for Button 3</div>
    </div>
  )
}

export default CreateContent