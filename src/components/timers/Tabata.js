import { useEffect, useContext, useRef } from "react";
import DisplayTime from "../../components/generic/DisplayTime";
import DisplayRound from "../../components/generic/DisplayRound";
import { TimerContext } from "./TimerProvider";

const InnerTabata = ({
  startVal,
  endVal,
  roundStartVal,
  roundEndVal,
  intervalStartVal,
  intervalEndVal,
}) => {
  const {
    count,
    setCount,
    round,
    setRound,
    interval,
    setInterv,
    isPaused,
    isStopped,
    remainingTime,
    setRemainingTime,
    dispatcher,
  } = useContext(TimerContext);
  const posRef = useRef();

  useEffect(() => {
    let t;

    if (isPaused || isStopped) {
      if (t) {
        clearTimeout(t);
      }
    }

    if (!isPaused && !isStopped) {
      if (count > 0) {
        t = setTimeout(() => {
          setCount(count - 1);
          setRemainingTime(remainingTime - 1);
        }, 1000);
      }

      if (count == 0 && interval > 0) {
        t = setTimeout(() => {
          setInterv(interval - 1);
          setRemainingTime(remainingTime - 1);
        }, 1000);
      }

      if (round - 1 > 0 && count == 0 && interval == 0) {
        setRound(round - 1);
        setCount(startVal);
        setInterv(intervalStartVal);
      }

      if (round == 1 && count == 0 && interval == 0) {
        dispatcher(posRef);
      }
    }

    return () => {
      if (t) {
        clearTimeout(t);
      }
    };
  }, [round, count, interval, isPaused, isStopped]);

  const pauseLabel = isPaused ? "Resume" : "Pause";

  const titleClass = !isStopped
    ? "time-setter-title disabled"
    : "time-setter-title";
  const valClass = !isStopped ? "time-setter-val disabled" : "time-setter-val";

  return (
    <div className="main-panel" ref={posRef}>
      <DisplayTime label="Count" count={count} />
      <DisplayTime label="Interval" count={interval} />
      <DisplayRound round={round} />
    </div>
  );
};

const Tabata = ({
  startVal,
  endVal,
  roundStartVal,
  roundEndVal,
  intervalStartVal,
  intervalEndVal,
  isRunning = false,
  isCompleted = false,
}) => {
  if (!isRunning || isCompleted) {
    return (
      <div className="main-panel">
        <DisplayTime label="Count" count={isCompleted ? endVal : startVal} />
        <DisplayTime
          label="Interval"
          count={isCompleted ? intervalEndVal : intervalStartVal}
        />
        <DisplayRound round={isCompleted ? roundEndVal : roundStartVal} />
      </div>
    );
  }

  return (
    <InnerTabata
      startVal={startVal}
      endVal={endVal}
      roundStartVal={roundStartVal}
      roundEndVal={roundEndVal}
      intervalStartVal={intervalStartVal}
      intervalEndVal={intervalEndVal}
    />
  );
};

export default Tabata;
