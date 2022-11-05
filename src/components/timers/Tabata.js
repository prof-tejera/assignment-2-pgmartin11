import { useState, useEffect, useContext } from 'react';
import TimerBtn from "../../components/generic/TimerBtn";
import { IncrementBtn, DecrementBtn } from "../../components/helpers/HMSBtn";
import SetterButtons from "../../components/helpers/SetterButtons";
import DisplayTime from "../../components/generic/DisplayTime";
import DisplayRound from "../../components/generic/DisplayRound";
import { incrementHelper, decrementHelper } from "../../utils/helpers";
import { TimerContext } from './TimerProvider';


const InnerTabata = ({ startVal, endVal, roundStartVal, roundEndVal, intervalStartVal, intervalEndVal }) => {
	const { count, setCount, round, setRound, interval, setInterv, 
		isPaused, isStopped, setStopped, activeTimerIdx, setActiveTimerIdx, timers, setTimers } = useContext(TimerContext);

	useEffect(() => {
		let t;

		if (isPaused || isStopped) {
			if (t) { clearTimeout(t); }
		}

		if (!isPaused && !isStopped) {
			if (count > 0) {
				t = setTimeout(() => {
					setCount(count-1);
				}, 1000)
			}

			if ((count == 0) && (interval > 0)) {
				t = setTimeout(() => {
					setInterv(interval-1);
				}, 1000)
			}
	 
			if ((round-1 > 0) && (count == 0) && (interval == 0)) {
				t = setTimeout(() => {
					setRound(round-1);
					setCount(startVal);
					setInterv(intervalStartVal);
				}, 1000)
			}

			if (round == 1 && count == 0 && interval == 0) {
				if (activeTimerIdx+1 < timers.length) {
				  const newTs = timers.map((timer, i) => {
			      if (i == activeTimerIdx) {
				      return {...timer, isCompleted: true };
			      }
		              return timer;
	              });
				  setTimers(newTs);

				  setCount(timers[activeTimerIdx+1].startVal);
				  setRound(timers[activeTimerIdx+1].roundStartVal);
				  setInterv(timers[activeTimerIdx+1].intervalStartVal);
				  setActiveTimerIdx(activeTimerIdx+1);
				} else {
				  const newTs = timers.map((timer, i) => {
			      if (i == activeTimerIdx) {
				      return {...timer, isCompleted: true };
			      }
		              return timer;
	              });
				  setTimers(newTs);
				  setStopped(true);
				}
			}
		}

		return () => { if (t) { clearTimeout(t); } }
	}, [round, count, interval, isPaused, isStopped]);


    const pauseLabel = isPaused ? "Resume" : "Pause"; 

    const titleClass = !isStopped ? 'time-setter-title disabled' : 'time-setter-title';
	const valClass = !isStopped ? 'time-setter-val disabled' : 'time-setter-val';

	return (
		<div className="main-panel">
			<DisplayTime label="Count" count={count} />
			<DisplayTime label="Interval" count={interval} />
			<DisplayRound round={round} />
		</div>
	);
}

const Tabata = ({ startVal, endVal, roundStartVal, roundEndVal, intervalStartVal, intervalEndVal, isRunning=false, isCompleted=false }) => {
	if (!isRunning || isCompleted) {
		return (
			<div className="main-panel">
				<DisplayTime label="Count" count={isCompleted ? endVal : startVal} />
				<DisplayTime label="Interval" count={isCompleted ? intervalEndVal : intervalStartVal} />
				<DisplayRound round={isCompleted ? roundEndVal : roundStartVal} />
			</div>
		);
	}

	return <InnerTabata startVal={startVal} endVal={endVal} roundStartVal={roundStartVal} roundEndVal={roundEndVal} intervalStartVal={intervalStartVal} intervalEndVal={intervalEndVal} />
}

export default Tabata;
