let time = 0;
let isRunning = false;
let interval = null;

/**
 *  Start or stop the timer 
 * @param {func} setTime 
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
 * @param {func} setTime 
 */
const resetTimer = (setTime) => {
    clearInterval(interval);
    setTime(0);
    isRunning = false;
    const returnTime = time;
    time = 0;

    return returnTime;
}

export { callTimer, resetTimer };