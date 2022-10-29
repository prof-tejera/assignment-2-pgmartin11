import React from "react";
import styled from "styled-components";

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
  const timers = [
    { title: "Stopwatch", C: <Stopwatch /> },
    { title: "Countdown", C: <Countdown /> },
    { title: "XY", C: <XY /> },
    { title: "Tabata", C: <Tabata /> },
  ];

  return (
    <Timers> {/* styling */}
      {timers.map((timer) => (
        <Timer key={`timer-${timer.title}`}>
          <TimerTitle>{timer.title}</TimerTitle> {/* styling */}
          {timer.C}
        </Timer>
      ))}
    </Timers>
  );
};

export default WorkoutView;
