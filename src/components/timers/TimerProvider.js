import React, { useState, createContext } from 'react';

import { timers } from '../../views/WorkoutView';

import Stopwatch from "./Stopwatch";
import Countdown from "./Countdown";
import XY from "./XY";
import Tabata from "./Tabata";

{/* import { usePersistedState } from '../hooks'; */}


export const TimerContext = createContext({});

const TimerProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [round, setRound] = useState(0);
  const [interval, setInterv] = useState(0);

  //*** active timer by index
  const [activeTimerIdx, setActiveTimerIdx] = useState(0);

  // workout - hard-coded for now
  const intial_timers = [
    { title: "Stopwatch", component: Stopwatch, startVal: 0, endVal: 5, isRunning: false, isCompleted: false },
    { title: "Stopwatch", component: Stopwatch, startVal: 0, endVal: 8, isRunning: false, isCompleted: false },
    { title: "Stopwatch", component: Stopwatch, startVal: 0, endVal: 4, isRunning: false, isCompleted: false },
/*
    { title: "Countdown", component: Countdown, startVal: 8, endVal: 0  },
    { title: "XY", component: XY, startVal: 10, endVal: 0, roundStartVal: 3, roundEndVal: 1 },
    { title: "Tabata", component: Tabata, startVal: 10, endVal: 10, roundStartVal: 3, roundEndVal: 1, intervalStartVal: 5, intervalEndVal: 0 },
 */
  ];

  const [timers, setTimers] = useState(intial_timers);

  console.log('*** timers',timers);



  const [isPaused, setPaused] = useState(false);
  const [isStopped, setStopped] = useState(true);

  return (
    <TimerContext.Provider
      value={{
        count, 
        setCount,
        round,
        setRound,
        interval,
        setInterv,
        isPaused,
        setPaused,
        isStopped,
        setStopped,
        activeTimerIdx,
        setActiveTimerIdx,
        timers,
        setTimers
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
