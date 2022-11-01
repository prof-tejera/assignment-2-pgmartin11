import React, { useState, createContext } from 'react';

import { timers } from '../../views/WorkoutView';

{/* import { usePersistedState } from '../hooks'; */}


export const TimerContext = createContext({});

const TimerProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [round, setRound] = useState(0);
  const [interval, setInterv] = useState(0);

  //*** active timer by index
  const [activeTimerIdx, setActiveTimerIdx] = useState(0);

  const [isPaused, setPaused] = useState(false);
  const [isStopped, setStopped] = useState(true);

  return (
    <TimerContext.Provider
      value={{
        foo: ()=>console.log('*** foo ***'),
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
        timers
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
