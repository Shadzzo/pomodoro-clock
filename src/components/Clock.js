import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faRefresh, faPause } from '@fortawesome/free-solid-svg-icons';
import Countdown from 'react-countdown';

function Clock ({breakLenght, sessionLenght}) {
    const [sessionMinute, setSessionMinute] = useState(sessionLenght);
    const [breakMinute, setBreakMinute] = useState(breakLenght);
    const [currentMode, setCurrentMode] = useState("Session");
    const [sessionCount, setSessionCount] = useState(0);
    const countdownRef = useRef(null);
    const startRef = useRef(null);
    const pauseRef = useRef(null);

    useEffect(() => {
        setSessionMinute(sessionLenght * 60 * 1000);
        setBreakMinute(breakLenght * 60 * 1000);
    }, [sessionLenght, breakLenght]);

    useEffect(() => {
        if (currentMode === "Break" && countdownRef.current) {
            countdownRef.current.start();
        } else if(currentMode === "Session" && countdownRef.current && sessionCount>0) {
            countdownRef.current.start();
        }
    }, [currentMode]);

    const startClock = () => {
        if (countdownRef.current) {
            countdownRef.current.start();
        }
        startRef.current.style.color = "aqua";
        pauseRef.current.style.color = "white";
    }

    const pauseClock = () => {
        if (countdownRef.current) {
            countdownRef.current.pause();
        }
        startRef.current.style.color = "white";
        pauseRef.current.style.color = "aqua";
    }

    const resetClock = () => {
        if (countdownRef.current) {
            countdownRef.current.stop();
        }
        startRef.current.style.color = "white";
        pauseRef.current.style.color = "white";
        setSessionCount(0)
        setCurrentMode("Session")
    }

    const renderer = ({ minutes, seconds }) => {
        return (
          <div>
            <p id='timer-display'>{minutes}{":"}{seconds === 0 ? '00' :  seconds < 10 ? '0' + seconds : seconds}</p>
          </div>
        )
    };

    return (
        <div>
            <div className='clock'>
                <div className="clock-wrapper">
                    <p>{currentMode} {currentMode === 'Session' ? sessionCount+1 : ''}</p>
                    {currentMode === "Session" ?
                    <Countdown
                        ref={countdownRef}
                        renderer={renderer}
                        date={Date.now() + sessionMinute} 
                        autoStart={false}
                        controlled={false}
                        onComplete={() => {setCurrentMode("Break"); setSessionCount(sessionCount+1)}}
                    /> :
                    <Countdown
                        ref={countdownRef}
                        renderer={renderer}
                        date={Date.now() + breakMinute} 
                        controlled={false}
                        onComplete={() => setCurrentMode("Session")}
                    />
                    }
                </div>
            </div>
            <div className="icon-wrapper">
                <FontAwesomeIcon icon={faPlay} className="font-icon" ref={startRef} onClick={() => startClock()}/>
                <FontAwesomeIcon icon={faPause} className="font-icon" ref={pauseRef} onClick={() => pauseClock()}/>
                <FontAwesomeIcon icon={faRefresh} className="font-icon" onClick={() => resetClock()}/>
            </div>
        </div>
     );
}

export default Clock