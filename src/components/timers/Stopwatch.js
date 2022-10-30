import { useState, useEffect, useContext } from 'react';
import TimerBtn from "../../components/generic/TimerBtn";
import DisplayTime from "../../components/generic/DisplayTime";
import { TimerContext } from './TimerProvider';


const InnerStopwatch = ({ seconds }) => {
	const { count, setCount, isPaused, isStopped, setStopped, activeTimerIdx, setActiveTimerIdx } = useContext(TimerContext);

	const startVal = 0,
		endVal = seconds;

	useEffect(() => {
		let t;

		if (!isPaused && !isStopped) {
			if (count < endVal) {
				t = setTimeout(() => {
				setCount(count+1);
				}, 1000)
			}

			if (count == endVal) {
				//setStopped(true);
				setActiveTimerIdx(activeTimerIdx+1);
				setCount(0);
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

const Stopwatch = ({ seconds, isRunning=false }) => {
	if (!isRunning) {
		return (
			<div className="main-panel">
				<DisplayTime label="Count" count={0} />
			</div>
		);
	}

	return <InnerStopwatch seconds={seconds} />
}

export default Stopwatch;
