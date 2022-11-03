import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PATHS } from '../../constants';
import TimerBtn from "../../components/generic/TimerBtn";
import { IncrementBtn, DecrementBtn } from "../../components/helpers/HMSBtn";
import SetterButtons from "../../components/helpers/SetterButtons";
import { incrementHelper, decrementHelper } from "../../utils/helpers";
import { TimerContext } from './TimerProvider';


const NewTimer = () => {
	const navigate = useNavigate();

	const [timer, setTimer] = useState(0);

	const [countHrs, setCountHrs] = useState(0);
	const [countMins, setCountMins] = useState(0);
	const [countSecs, setCountSecs] = useState(0);

	const [intervalHrs, setIntervalHrs] = useState(0);
	const [intervalMins, setIntervalMins] = useState(0);
	const [intervalSecs, setIntervalSecs] = useState(0);
	const [countRounds, setCountRounds] = useState(1);



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

	console.log('timer',timer);

	let setters;
	switch (timer) {
		case 'countdown':
		case 'stopwatch':
			setters = <SetterButtons {...setterBtnData} />;
			break;
		case 'xy':
			setters = (
				<>
					<SetterButtons {...setterBtnData} />
					<br/>
					<span> Rounds:</span><DecrementBtn handler={() => { setCountRounds(decrementHelper(countRounds, 1)); }}/>
					<span>{countRounds}</span>
					<IncrementBtn handler={() => { setCountRounds(incrementHelper(countRounds)); }}/>
				</>
			);
			break;
		case 'tabata':
			setters = (
				<>
					<div className="interval-wrapper"><SetterButtons {...setterBtnData} /></div>
					<div className="interval-wrapper"><SetterButtons {...setterIntervalBtnData} /></div>
					<br/>
					<span>Rounds:</span><DecrementBtn handler={() => { setCountRounds(decrementHelper(countRounds, 1)); }}/>
					<span>{countRounds}</span>
					<IncrementBtn handler={() => { setCountRounds(incrementHelper(countRounds)); }}/>
				</>
			);
	}

	return (
		<div className="main-panel">
			{/* <form action={f=>f}> */}
				<label>Pick your choice of timer:
					<select value={timer} onChange={(e) => { setTimer(e.target.value); }}>
						<option value="">--</option>
						<option value="countdown">Countdown</option>
						<option value="stopwatch">Stopwatch</option>
						<option value="xy">XY</option>
						<option value="tabata">Tabata</option>
					</select>
				</label>
				<br/>
				{setters}
				<br/>
				<input type="submit" value="Submit" />
			{/* </form> */}
      		<TimerBtn handler={() => navigate(PATHS.HOME)} label="Return to workout" />
		</div>
	);
}

export default NewTimer;
