import { useState, useEffect, useContext } from 'react';
import TimerBtn from "../../components/generic/TimerBtn";
import DisplayTime from "../../components/generic/DisplayTime";
import { TimerContext } from './TimerProvider';


const InnerStopwatch = ({ startVal, endVal }) => {
	const {  count, setCount, round, setRound, isPaused, isStopped, setStopped, activeTimerIdx, setActiveTimerIdx, timers, setTimers, dispatcher, remainingTime, setRemainingTime } = useContext(TimerContext);

	useEffect(() => {
		let t;

		if (!isPaused && !isStopped) {
			if (count < endVal) {
				t = setTimeout(() => {
				setCount(count+1);
				setRemainingTime(remainingTime-1);
				}, 1000)
			}

			if (count == endVal) {
				dispatcher();
			}
		}

		return () => { if (t) { clearTimeout(t); } }
	}, [count, endVal, isPaused, isStopped]);


	return (
		<div className="main-panel">
			<DisplayTime label="Count" count={count} />
		</div>
	);
}

const Stopwatch = ({ startVal, endVal, isRunning=false, isCompleted=false}) => {

	if (!isRunning || isCompleted) {
		return (
			<div className="main-panel">
				<DisplayTime label="Count" count={isCompleted ? endVal : startVal} />
			</div>
		);
	}

	return <InnerStopwatch startVal={startVal} endVal={endVal} />
}

export default Stopwatch;
