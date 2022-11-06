// Add helpers here. This is usually code that is just JS and not React code. Example: write a function that
// calculates number of minutes when passed in seconds. Things of this nature that you don't want to copy/paste
// everywhere.

/*
 * increment number passed in up to upper limit
 */
export const incrementHelper = (val, upLimit=99) => {
    if (val === upLimit) { return val; }

    return val+1;
}

/*
 * decrement number passed in down to lower limit
 */
export const decrementHelper = (val, downLimit=0) => {
    if (val == downLimit) { return val; }

    return val-1;
}

/* 
 * add leading zeros to number
 *
 * adapted from https://bobbyhadz.com/blog/javascript-add-leading-zeros-to-number 
 */
const addLeadingZeros = (num, totalLength=2) => {
    return String(num).padStart(totalLength, '0');
}

/* 
 * derive hours, minutes, seconds from seconds passed in 
 */
export const calcHMS = (count) => {
    const timerHrs = addLeadingZeros(Math.floor(count / (60 * 60))),
      timerMins = addLeadingZeros(Math.floor((count - timerHrs * 60 * 60) / 60)),
      timerSecs = addLeadingZeros(count - timerHrs * 60 * 60 - timerMins * 60);

  return { timerHrs, timerMins, timerSecs };
}

/* 
 * derive hours, minutes, seconds from seconds passed in 
 */
export const calcSeconds = (hrs, mins, secs) => {
    return hrs * 60 * 60 + mins * 60 + secs;
}

export const calcWorkoutTime = (timers) => {
    let totalTime = 0,
      timerSecs = 0;

    timers.forEach((timerData, idx) => {
      timerSecs = 0;

      switch (timers[idx].title) {
        case 'Stopwatch':
          timerSecs = timers[idx].endVal;
          break;
        case 'Countdown':
          timerSecs = timers[idx].startVal;
          break;
        case 'XY':
          timerSecs = timers[idx].startVal * timers[idx].roundStartVal;
          break;
        case 'Tabata':
          timerSecs = (timers[idx].startVal + timers[idx].intervalStartVal) * timers[idx].roundStartVal;
      }

      totalTime += timerSecs;
    });

    return totalTime;
}