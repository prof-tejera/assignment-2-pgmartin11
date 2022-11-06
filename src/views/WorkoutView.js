import React from "react";
import { useContext, useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PATHS } from '../constants';
import TimerBtn from "../components/generic/TimerBtn";
import { calcWorkoutTime, calcTotalFastForwardTime } from "../utils/helpers";

import { TimerContext } from '../components/timers/TimerProvider';

import DisplayTime from "../components/generic/DisplayTime";

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
    isPaused, setPaused, isStopped, setStopped, activeTimerIdx, 
    setActiveTimerIdx, timers, setTimers, remainingTime, setRemainingTime } = useContext(TimerContext);

  const workoutRunningTime = useRef(0);

  useEffect(() => {
    workoutRunningTime.current = calcWorkoutTime(timers);
    setRemainingTime(workoutRunningTime.current);
  }, []);

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

            if (timers[0].title == 'XY' || timers[0].title == 'Tabata') {
              setRound(timers[0].roundStartVal);
            }
            if (timers[0].title == 'Tabata') { 
              setInterv(timers[0].intervalStartVal); 
            }

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
                  setCount(timers[activeTimerIdx].endVal);

                  if (timers[activeTimerIdx].title == 'XY' || timers[activeTimerIdx].title == 'Tabata') {
                    setRound(timers[activeTimerIdx].roundEndVal);
                  }
                  if (timers[activeTimerIdx].title == 'Tabata') { 
                    setInterv(timers[activeTimerIdx].intervalEndVal);
                  }

                  setRemainingTime(workoutRunningTime.current - calcTotalFastForwardTime(timers, activeTimerIdx));
              }
            }}
        />
      </div>
      <TimerBtn handler={() => navigate(PATHS.ADD)} label="Add Timer" />
      {isStopped && <DisplayTime label="Total time" count={calcWorkoutTime(timers)} />}
      {!isStopped && <DisplayTime label="Running time" count={remainingTime} />}
      <Timers>
        {timers.map((timerData, idx) => (
          <React.Fragment key={`wrap-${timerData.title}-${idx}`} >
            {isStopped && <TimerBtn key={`del-btn-${timerData.title}-${idx}`} handler={() => removeTimer(idx)} label="Delete" />}
            <Timer key={`timer-${timerData.title}-${idx}`}>
              <TimerTitle>{timerData.title}</TimerTitle>
              <timerData.component {...timerData} isRunning={idx === activeTimerIdx} />
            </Timer>
          </React.Fragment>
        ))}
      </Timers>
    </>
  );
};

export default WorkoutView;
