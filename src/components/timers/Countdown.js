import { useState, useEffect } from 'react';
import TimerBtn from "../../components/generic/TimerBtn";
import { IncrementBtn, DecrementBtn } from "../../components/helpers/HMSBtn";
import SetterButtons from "../../components/helpers/SetterButtons";
import DisplayTime from "../../components/generic/DisplayTime";


const Countdown = () => {
	const [countHrs, setCountHrs] = useState(0);
	const [countMins, setCountMins] = useState(0);
	const [countSecs, setCountSecs] = useState(0);

	const [count, setCount] = useState(0);
	const [isPaused, setPaused] = useState(false);
	const [isStopped, setStopped] = useState(true);

	const startVal = countHrs * 60 * 60 + countMins * 60 + countSecs,
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
				setStopped(true);
			}
		}

		return () => { if(t) { clearTimeout(t); }}
	}, [count, isPaused, isStopped]);

	const setterBtnData = {
		hoursLabel: 'Hours',
		minutesLabel: 'Minutes',
		secondsLabel: 'Seconds',
		countHrs,
		countMins,
		countSecs,
		setCountHrs,
		setCountMins,
		setCountSecs
	};

	const pauseLabel = isPaused ? "Resume" : "Pause"; 

	return (
		<div className="main-panel">
			<DisplayTime label="Count" count={count} />
			<div className="control-btn-wrapper">
				{isStopped &&
				<TimerBtn label="Start" handler={() => { 
					setCount(startVal); 
					setStopped(false); 
					setPaused(false); }}
				/>
				}
				{!isStopped && <TimerBtn label={pauseLabel} handler={() => setPaused(!isPaused)}/>}
				<TimerBtn disabled={isStopped} label="Reset" handler={() => { setCount(startVal); setStopped(true) }}/>
				<TimerBtn disabled={isStopped} label="Fast Forward" handler={() => { if(!isStopped) { setCount(endVal); setStopped(true); }}}/>
			</div>
			<SetterButtons disabled={!isStopped} {...setterBtnData} />
		</div>
	);
}

export default Countdown;
