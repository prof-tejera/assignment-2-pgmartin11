import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import TimerProvider from "./components/timers/TimerProvider";
import NewTimer from "./components/timers/NewTimer";
import WorkoutView from "./views/WorkoutView";

const Container = styled.div`
  background: #f0f6fb;
  height: 100vh;
  overflow: auto;
`;

{/*
const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Timers</Link>
        </li>
        <li>
          <Link to="/docs">Documentation</Link>
        </li>
      </ul>
    </nav>
  );
};
*/}


const App = () => {
  return (
    <Container> {/* styling */}
      <TimerProvider>
        <Router>
          <Routes>
            <Route path="/" element={<WorkoutView />} />
            <Route path="/add" element={<NewTimer />} />
          </Routes>
        </Router>
      </TimerProvider>
    </Container>
  );
};

export default App;
