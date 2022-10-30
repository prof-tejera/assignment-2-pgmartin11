import { useState, useEffect, useContext } from 'react';
import TimerBtn from "../../components/generic/TimerBtn";
import { IncrementBtn, DecrementBtn } from "../../components/helpers/HMSBtn";
import SetterButtons from "../../components/helpers/SetterButtons";
import DisplayTime from "../../components/generic/DisplayTime";
import { TimerContext } from './TimerProvider';


const InnerCountdown = ({ seconds }) => {
	const { count, setCount, isPaused, isStopped, setStopped, activeTimerIdx, setActiveTimerIdx } = useContext(TimerContext);

	const startVal = seconds,
		endVal = 0;

	useEffect(() => {
		let t;

		if (!isPaused && !isStopped) {
			if (count > 0) {
				t = setTimeout(() => {
				setCount(count-1);
				}, 1000)
			}

			if (count == 0) {
				// setStopped(true);
				setActiveTimerIdx(activeTimerIdx+1);
				setCount(0); // should not be a hardcoded value
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

const Countdown = ({ seconds, isRunning=false }) => {
	if (!isRunning) {
		return (
			<div className="main-panel">
				<DisplayTime label="Count" count={0} />
			</div>
		);
	}

	return <InnerCountdown seconds={seconds} />
}

export default Countdown;
