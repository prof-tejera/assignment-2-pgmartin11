import { useState, useEffect } from 'react';
import TimerBtn from "../../components/generic/TimerBtn";
import { IncrementBtn, DecrementBtn } from "../../components/helpers/HMSBtn";
import SetterButtons from "../../components/helpers/SetterButtons";
import DisplayTime from "../../components/generic/DisplayTime";
import DisplayRound from "../../components/generic/DisplayRound";
import { incrementHelper, decrementHelper } from "../../utils/helpers";

const Tabata = () => {
	const [countHrs, setCountHrs] = useState(0);
	const [countMins, setCountMins] = useState(0);
	const [countSecs, setCountSecs] = useState(0);
	const [intervalHrs, setIntervalHrs] = useState(0);
	const [intervalMins, setIntervalMins] = useState(0);
	const [intervalSecs, setIntervalSecs] = useState(0);
	const [countRounds, setCountRounds] = useState(1);

	const [interval, setInterv] = useState(0);
	const [count, setCount] = useState(0);
	const [round, setRound] = useState(1);
	const [isPaused, setPaused] = useState(false);
	const [isStopped, setStopped] = useState(true);

	const startVal = countHrs * 60 * 60 + countMins * 60 + countSecs,
		endVal = 0,
		intervalStartVal = intervalHrs * 60 * 60 + intervalMins * 60 + intervalSecs,
		intervalEndVal = 0,
		roundStartVal = countRounds,
		roundEndVal = 1;

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
	      		setStopped(true);
			}
		}

		return () => { if (t) { clearTimeout(t); } }
	}, [round, count, interval, isPaused, isStopped]);

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

	const setterIntervalBtnData = {
		hoursLabel: 'Interval Hours',
    	minutesLabel: 'Interval Minutes',
    	secondsLabel: 'Interval Seconds',
    	countHrs: intervalHrs,
    	countMins: intervalMins,
    	countSecs: intervalSecs,
    	setCountHrs: setIntervalHrs,
    	setCountMins: setIntervalMins,
    	setCountSecs: setIntervalSecs
    };

    const pauseLabel = isPaused ? "Resume" : "Pause"; 

    const titleClass = !isStopped ? 'time-setter-title disabled' : 'time-setter-title';
	const valClass = !isStopped ? 'time-setter-val disabled' : 'time-setter-val';

	return (
		<div className="main-panel">
			<DisplayTime label="Count" count={count} />
			<DisplayTime label="Interval" count={interval} />
			<DisplayRound round={round} />
			<div className="control-btn-wrapper">
				{isStopped &&
				<TimerBtn label="Start" handler={() => { 
					setInterv(intervalStartVal);
					setCount(startVal); 
					setRound(countRounds); 
					setStopped(false); 
					setPaused(false); }}
				/>
				}
				{!isStopped && <TimerBtn label={pauseLabel} handler={() => setPaused(!isPaused)}/>}
				<TimerBtn disabled={isStopped} label="Reset" handler={() => { setInterv(intervalStartVal); setCount(startVal); setRound(roundStartVal); setStopped(true); }}/>
				<TimerBtn disabled={isStopped} label="Fast Forward" handler={() => { if(!isStopped) { setInterv(intervalEndVal); setCount(endVal); setRound(roundEndVal); setStopped(true); }}}/>
			</div>
			<div className="interval-wrapper"><SetterButtons disabled={!isStopped} {...setterBtnData} /></div>
			<div className="interval-wrapper"><SetterButtons disabled={!isStopped} {...setterIntervalBtnData} /></div>
			<span className={titleClass}>Rounds:</span><DecrementBtn disabled={!isStopped} handler={() => { setCountRounds(decrementHelper(countRounds, 1)); }}/>
			<span className={valClass}>{countRounds}</span>
			<IncrementBtn disabled={!isStopped} handler={() => { setCountRounds(incrementHelper(countRounds)); }}/>
		</div>
	);
}

export default Tabata;
