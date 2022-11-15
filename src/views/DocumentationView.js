import React from "react";
import styled from "styled-components";
import DocumentComponent from "../components/documentation/DocumentComponent";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Title = styled.div`
  font-size: 2rem;
`;

/**
 * You can document your components by using the DocumentComponent component
 */
const Documentation = () => {
  return (
    <Container>
      <div>
        <Title>Documentation</Title>
        <DocumentComponent
          title="Stopwatch Timer"
          propDocs={[
            {
              prop: "startVal",
              description: "Counter starting value in seconds",
              type: "integer",
              defaultValue: "N/A",
            },
            {
              prop: "endVal",
              description: "Counter ending value in seconds",
              type: "integer",
              defaultValue: "N/A",
            },
            {
              prop: "isRunning",
              description: "Indicates if timer is running",
              type: "boolean",
              defaultValue: "false",
            },
            {
              prop: "isCompleted",
              description: "Indicates if timer has completed running",
              type: "boolean",
              defaultValue: "false",
            },
          ]}
        />
        <DocumentComponent
          title="Countdown Timer"
          propDocs={[
            {
              prop: "startVal",
              description: "Counter starting value in seconds",
              type: "integer",
              defaultValue: "N/A",
            },
            {
              prop: "endVal",
              description: "Counter ending value in seconds",
              type: "integer",
              defaultValue: "N/A",
            },
            {
              prop: "isRunning",
              description: "Indicates if timer is running",
              type: "boolean",
              defaultValue: "false",
            },
            {
              prop: "isCompleted",
              description: "Indicates if timer has completed running",
              type: "boolean",
              defaultValue: "false",
            },
          ]}
        />
        <DocumentComponent
          title="XY Timer"
          propDocs={[
            {
              prop: "startVal",
              description: "Counter starting value in seconds",
              type: "integer",
              defaultValue: "N/A",
            },
            {
              prop: "endVal",
              description: "Counter ending value in seconds",
              type: "integer",
              defaultValue: "N/A",
            },
            {
              prop: "roundStartVal",
              description: "Round starting value",
              type: "integer",
              defaultValue: "N/A",
            },
            {
              prop: "roundEndVal",
              description: "Round ending value",
              type: "integer",
              defaultValue: "N/A",
            },
            {
              prop: "isRunning",
              description: "Indicates if timer is running",
              type: "boolean",
              defaultValue: "false",
            },
            {
              prop: "isCompleted",
              description: "Indicates if timer has completed running",
              type: "boolean",
              defaultValue: "false",
            },
          ]}
        />
        <DocumentComponent
          title="Tabata Timer"
          propDocs={[
            {
              prop: "startVal",
              description: "Counter starting value in seconds",
              type: "integer",
              defaultValue: "N/A",
            },
            {
              prop: "endVal",
              description: "Counter ending value in seconds",
              type: "integer",
              defaultValue: "N/A",
            },
            {
              prop: "roundStartVal",
              description: "Round starting value",
              type: "integer",
              defaultValue: "N/A",
            },
            {
              prop: "intervalStartVal",
              description: "Interval starting value in seconds",
              type: "integer",
              defaultValue: "N/A",
            },
            {
              prop: "intervalEndVal",
              description: "Interval ending value in seconds",
              type: "integer",
              defaultValue: "N/A",
            },
            {
              prop: "isRunning",
              description: "Indicates if timer is running",
              type: "boolean",
              defaultValue: "false",
            },
            {
              prop: "isCompleted",
              description: "Indicates if timer has completed running",
              type: "boolean",
              defaultValue: "false",
            },
          ]}
        />
      </div>
    </Container>
  );
};

export default Documentation;
