import React, { useState } from 'react';
{/* import { usePersistedState } from '../hooks'; */}
export const TimerContext = React.createContext({});

const TimerProvider = ({ children }) => {
  // const [posts, setPosts] = usePersistedState('posts', []);
  // const [selectedPostId, setSelectedPostId] = usePersistedState('selectedPostId', null);

  return (
    <TimerContext.Provider
      value={{
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
