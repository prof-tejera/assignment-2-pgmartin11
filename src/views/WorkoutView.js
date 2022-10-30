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

  const { count, setCount, isPaused, setPaused, isStopped, setStopped, activeTimerIdx } = useContext(TimerContext);

  //*** these values ultimately passed in from AddPost 

  /* Stopwatch
  const startVal = 0;
  const endVal = 5;
  */

  /* Countdown
  const startVal = 8;
  const endVal = 0;
   */

  /* XY */
  const startVal = 10;
  const endVal = 0;
  

  const timers = [
  /*
    { title: "Stopwatch", component: Stopwatch, seconds: 5 },
    { title: "Stopwatch", component: Stopwatch, seconds: 5 },
    { title: "Countdown", component: Countdown, seconds: 8 },
    { title: "XY", component: XY, seconds: 10, rounds: 3 },
  */
    { title: "Tabata", component: Tabata, seconds: 10, round: 3, interval: 5 },
  ];

  const pauseLabel = isPaused ? "Resume" : "Pause"; 

  return (
    <>
      <div className="control-btn-wrapper">
        {isStopped &&
          <TimerBtn label="Start" handler={() => { 
            setCount(startVal); 
            setStopped(false); 
            setPaused(false); }}
          />
        }
        {!isStopped && <TimerBtn label={pauseLabel} handler={() => setPaused(!isPaused)}/>}
        <TimerBtn disabled={isStopped} label="Reset" handler={() => { setCount(startVal); setStopped(true); }}/>
        <TimerBtn disabled={isStopped} label="Fast Forward" handler={() => { if(!isStopped) { setCount(endVal); setStopped(true); }}}/>
      </div>
      <TimerBtn handler={() => navigate(PATHS.ADD)} label="Add Timer" />
      <Timers>
        {timers.map((timerData, idx) => (
          <Timer key={`timer-${timerData.title}-${idx}`}>
            <TimerTitle>{timerData.title}</TimerTitle>
            <timerData.component {...timerData} isRunning={idx === activeTimerIdx} />
          </Timer>
        ))}
      </Timers>
    </>
  );
};

export default WorkoutView;
