import { useState, useEffect, useContext } from 'react';
import TimerBtn from "../../components/generic/TimerBtn";
import { IncrementBtn, DecrementBtn } from "../../components/helpers/HMSBtn";
import SetterButtons from "../../components/helpers/SetterButtons";
import DisplayTime from "../../components/generic/DisplayTime";
import { TimerContext } from './TimerProvider';


const InnerCountdown = ({ startVal, endVal, roundStartVal, roundEndVal }) => {
	const { count, setCount, round, setRound, isPaused, isStopped, setStopped, activeTimerIdx, setActiveTimerIdx, timers } = useContext(TimerContext);

/*
	const startVal = seconds,
		endVal = 0;
 */

	useEffect(() => {
		let t;

		if (!isPaused && !isStopped) {
			if (count > 0) {
				t = setTimeout(() => {
				setCount(count-1);
				}, 1000)
			}

			if (count == 0) {
				if (activeTimerIdx+1 < timers.length) {
				  setCount(timers[activeTimerIdx+1].startVal);
				  setRound(timers[activeTimerIdx+1].roundStartVal);
				  setActiveTimerIdx(activeTimerIdx+1);
				} else {
				  setStopped(true);
				}
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

const Countdown = ({ startVal, endVal, roundStartVal, roundEndVal, isRunning=false }) => {
	if (!isRunning) {
		return (
			<div className="main-panel">
				<DisplayTime label="Count" count={0} />
			</div>
		);
	}

	return <InnerCountdown startVal={startVal} endVal={endVal} />
}

export default Countdown;
