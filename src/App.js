import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";
import TimerProvider from "./components/timers/TimerProvider";
import NewTimer from "./components/timers/NewTimer";
import WorkoutView from "./views/WorkoutView";
import { PATHS } from "./constants";

const Container = styled.div`
  background: #f0f6fb;
  height: 100vh;
  overflow: auto;
`;

/*
const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={PATHS.HOME}>Timers</Link>
        </li>
        <li>
          <Link to={PATHS.ADD}>Add Timer</Link>
        </li>
      </ul>
    </nav>
  );
};
*/

const App = () => {
  return (
    <Container>
      <TimerProvider>
        <Router>
          <Routes>
            <Route path={PATHS.HOME} element={<WorkoutView />} />
            <Route path={PATHS.ADD} element={<NewTimer />} />
            <Route path="*" element={<Navigate to={PATHS.HOME} />} />
          </Routes>
        </Router>
      </TimerProvider>
    </Container>
  );
};

export default App;
