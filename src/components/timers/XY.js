import { useState, useEffect, useContext } from 'react';
import TimerBtn from "../../components/generic/TimerBtn";
import { IncrementBtn, DecrementBtn } from "../../components/helpers/HMSBtn";
import SetterButtons from "../../components/helpers/SetterButtons";
import DisplayTime from "../../components/generic/DisplayTime";
import DisplayRound from "../../components/generic/DisplayRound";
import { incrementHelper, decrementHelper } from "../../utils/helpers";
import { TimerContext } from './TimerProvider';


const XY = ({ seconds, rounds }) => {
	const { count, setCount, round, setRound, isPaused, isStopped, setStopped, activeTimerIdx, setActiveTimerIdx } = useContext(TimerContext);

    const startVal = seconds,
		endVal = 0,
		roundStartVal = rounds,
		roundEndVal = 1;

	useEffect(() => {
		let t;

		if (!isPaused && !isStopped) {
			if (count > 0) {
				t = setTimeout(() => {
				  setCount(count-1);
				}, 1000)
			}

			if ((round-1 > 0) && count == 0) {
				t = setTimeout(() => {
				  setRound(round-1);
				  setCount(startVal);
				}, 1000)
			}

			if (round == 1 && count == 0) {
				setStopped(true);
			}
		}

		return () => { if (t) { clearTimeout(t); } }
	}, [round, count, isPaused, isStopped]);

    const pauseLabel = isPaused ? "Resume" : "Pause"; 

    const titleClass = !isStopped ? 'time-setter-title disabled' : 'time-setter-title';
	const valClass = !isStopped ? 'time-setter-val disabled' : 'time-setter-val';

	return (
		<div className="main-panel">
			<DisplayTime label="Count" count={count} />
			<DisplayRound round={round} />
		</div>
	);
}

export default XY;
