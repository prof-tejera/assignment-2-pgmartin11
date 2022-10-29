import React from "react";
import styled from "styled-components";

import DocumentComponent from "../components/documentation/DocumentComponent";

import Loading from "../components/generic/Loading";
import DisplayTime from "../components/generic/DisplayTime";
import DisplayRound from "../components/generic/DisplayRound";
import TimerBtn from "../components/generic/TimerBtn";


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
  if (true) return <h1>Hello</h1>;
  
  return (
    <Container>
      <div>
        <Title>Documentation</Title>
        <DocumentComponent
          title="DisplayTime: show counter value in hours, minutes, seconds format"
          component={<DisplayTime label="Counter" count={363} />}
          propDocs={[
            {
              prop: "label",
              description: "Label for the counter metric",
              type: "string",
              defaultValue: "N/A",
            },
            {
              prop: "count",
              description: "Counter time in seconds",
              type: "integer",
              defaultValue: "N/A",
            },
          ]}
        />
        <DocumentComponent
          title="DisplayRound: display round number"
          component={<DisplayRound round={1}/>}
          propDocs={[
            {
              prop: "round",
              description: "Represents the current round",
              type: "integer",
              defaultValue: "N/A",
            },
          ]}
        />
        <DocumentComponent 
          title="TimerBtn: timer button"
          component={<TimerBtn label="Resume" handler={f=>f} disabled={false}/>} 
          propDocs={[
            {
              prop: "label",
              description: "Button label",
              type: "string",
              defaultValue: "N/A",
            },
            {
              prop: "handler",
              description: "Button click handler",
              type: "function",
              defaultValue: "N/A",
            },
            {
              prop: "disabled",
              description: "Represents the button state, enabled or disabled",
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
