import { useState, useEffect, useContext } from 'react';
import TimerBtn from "../../components/generic/TimerBtn";
import { IncrementBtn, DecrementBtn } from "../../components/helpers/HMSBtn";
import SetterButtons from "../../components/helpers/SetterButtons";
import DisplayTime from "../../components/generic/DisplayTime";
import { TimerContext } from './TimerProvider';


const InnerCountdown = ({ startVal, endVal }) => {
	const { count, setCount, round, setRound, isPaused, isStopped, setStopped, activeTimerIdx, setActiveTimerIdx, timers, setTimers, dispatcher } = useContext(TimerContext);

	useEffect(() => {
		let t;

		if (!isPaused && !isStopped) {
			if (count > 0) {
				t = setTimeout(() => {
				setCount(count-1);
				}, 1000)
			}

			if (count == 0) {
				dispatcher();
			}
		}

		return () => { if(t) { clearTimeout(t); }}
	}, [count, isPaused, isStopped]);

	const pauseLabel = isPaused ? "Resume" : "Pause"; 

	return (
		<div className="main-panel">
			<DisplayTime label="Count" count={count} />
		</div>
	);
}

const Countdown = ({ startVal, endVal, roundStartVal, roundEndVal, isRunning=false, isCompleted=false }) => {

	if (!isRunning || isCompleted) {
		return (
			<div className="main-panel">
				<DisplayTime label="Count" count={isCompleted ? endVal : startVal} />
			</div>
		);
	}

	return <InnerCountdown startVal={startVal} endVal={endVal} />
}

export default Countdown;
