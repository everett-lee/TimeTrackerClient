let time = 1;
let isRunning = false;
let interval = null;

/**
 *  Start or stop the timer 
 * @param {Function} setTime 
 */
const callTimer = (setTime) => {
    // The timer is not running 
    if (!isRunning) {
        interval = setInterval(() => {
            setTime(time++);
        }, 1000);
        isRunning = true;
    } else {
        clearInterval(interval);
        isRunning = false;
    }
}

/**
 *  Resets all state and returns the
 *  current time
 * @param {Function} setTime 
 */
const resetTimer = (setTime) => {
    clearInterval(interval);
    setTime(0);
    isRunning = false;
    const returnTime = time;
    time = 1;

    return returnTime;
}

export { callTimer, resetTimer };