import { useState, useEffect, useContext } from 'react';
import TimerBtn from "../../components/generic/TimerBtn";
import DisplayTime from "../../components/generic/DisplayTime";
import { TimerContext } from './TimerProvider';


const InnerStopwatch = ({ startVal, endVal }) => {
	const {  count, setCount, round, setRound, isPaused, isStopped, setStopped, activeTimerIdx, setActiveTimerIdx, timers } = useContext(TimerContext);

 console.log('**** startVal', startVal, 'count', count);
/*
	const startVal = 0,
		endVal = seconds;
 */

	useEffect(() => {
		let t;

		if (!isPaused && !isStopped) {
			if (count < endVal) {
				t = setTimeout(() => {
				setCount(count+1);
				}, 1000)
			}

			if (count == endVal) {
				if (activeTimerIdx+1 < timers.length) {
				  setCount(timers[activeTimerIdx+1].startVal);
				  setActiveTimerIdx(activeTimerIdx+1);
				} else {
				  setActiveTimerIdx(0);
				  setStopped(true);
				}
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

const Stopwatch = ({ startVal, endVal, isRunning=false }) => {
	if (!isRunning) {
		return (
			<div className="main-panel">
				<DisplayTime label="Count" count={startVal} />
			</div>
		);
	}

	return <InnerStopwatch startVal={startVal} endVal={endVal} />
}

export default Stopwatch;
