import React from "react";
import { useContext, useState, useEffect } from 'react';
import styled from "styled-components";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PATHS } from '../constants';
import TimerBtn from "../components/generic/TimerBtn";

import { TimerContext } from '../components/timers/TimerProvider';

import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";

const Timers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Timer = styled.div`
  border: 2px solid gray;
  border-radius: 5px;
  padding: 20px;
  margin: 10px;
  font-size: 1.5rem;
  background-color: #ced5e0;
`;

const TimerTitle = styled.div`
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;
`;

const WorkoutView = () => {
  const navigate = useNavigate();

  const { count, setCount, round, setRound, interval, setInterv, 
    isPaused, setPaused, isStopped, setStopped, activeTimerIdx, setActiveTimerIdx, timers, setTimers } = useContext(TimerContext);

  const removeTimer = (idx) => {
    const buf = timers.filter((timer, i) => i !== idx);

    setTimers(buf);
  }

  const pauseLabel = isPaused ? "Resume" : "Pause"; 

  return (
    <>
      <div className="control-btn-wrapper">
        {isStopped &&
          <TimerBtn label="Start" handler={() => { 
            const newTs = timers.map((timer, i) => {
                return {...timer, isRunning: false, isCompleted: false };
            });
            setTimers(newTs);
            setCount(timers[0].startVal);
            setActiveTimerIdx(0);
            setStopped(false); 
            setPaused(false); }}
          />
        }
        {!isStopped && <TimerBtn label={pauseLabel} handler={() => setPaused(!isPaused)}/>}
        <TimerBtn disabled={isStopped} 
            label="Reset" 
            handler={() => { 
              const newTs = timers.map((timer, i) => {
                  return {...timer, isRunning: false, isCompleted: false };
              });
              setTimers(newTs);
              setStopped(true);
              setActiveTimerIdx(999); /* a kludge but works */
            }}
        />
        <TimerBtn disabled={isStopped} 
            label="Fast Forward" 
            handler={() => { 
              if(!isStopped) { 
                  setCount(timers[activeTimerIdx].endVal); /* setRound, setInterv */ 
                  setRound(timers[activeTimerIdx].roundEndVal);
                  setInterv(timers[activeTimerIdx].intervalEndVal);
              }
            }}
        />
      </div>
      <TimerBtn handler={() => navigate(PATHS.ADD)} label="Add Timer" />
      <Timers>
        {timers.map((timerData, idx) => (
          <>
          <Timer key={`timer-${timerData.title}-${idx}`}>
            <TimerTitle>{timerData.title}</TimerTitle>
            <timerData.component {...timerData} isRunning={idx === activeTimerIdx} />
          </Timer>
          {isStopped && <TimerBtn handler={() => removeTimer(idx)} label="Delete" />}
         </>
        ))}
      </Timers>
    </>
  );
};

export default WorkoutView;
