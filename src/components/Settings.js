import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import Clock from './Clock';

function Settings() {
    const [breakLenght, setBreakLenght] = useState(5);
    const [sessionLenght, setSessionLenght] = useState(25);

    const increaseValue = (value, isBreak) => {
        isBreak ? setBreakLenght(value+1) : setSessionLenght(value+1);
    }

    const decreaseValue = (value, isBreak) => {
        if(value > 1) {
            isBreak ? setBreakLenght(value-1) : setSessionLenght(value-1);
        }
    }

    return (
      <div className="settings">
            <div className="settings-wrapper">
                <div className="timer-lenght">
                    <p>Break Lenght</p>
                    <div className='timer-settings'>
                        <FontAwesomeIcon icon={faArrowDown} className="font-icon" onClick={() => decreaseValue(breakLenght, true)} />
                        <p>{breakLenght}</p>
                        <FontAwesomeIcon icon={faArrowUp} className="font-icon" onClick={() => increaseValue(breakLenght, true)} />
                    </div>
                </div>
                <div className="timer-lenght">
                    <p>Session Lenght</p>
                    <div className='timer-settings'>
                        <FontAwesomeIcon icon={faArrowDown} className="font-icon" onClick={() => decreaseValue(sessionLenght, null)} />
                        <p>{sessionLenght}</p>
                        <FontAwesomeIcon icon={faArrowUp} className="font-icon" onClick={() => increaseValue(sessionLenght, null)} />
                    </div>
                </div>
            </div>
            <Clock breakLenght={breakLenght} sessionLenght={sessionLenght}/>
      </div>
    );
  }
  
  export default Settings;
  