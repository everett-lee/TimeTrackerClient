const ONE_DAY = 60 * 60 * 24;
/**
 *  Convert time in seconds to a format suitable for display
 * 
 * @param {number} timeIn 
 * @param {boolean} hideSeconds 
 * @param {boolean} OneDayMax
 */
const convertToHoursMinutesAndSecondsDisplay = (timeIn, hideSeconds, OneDayMax) => {
    // Time will stop updating after 23:59:59
    if (OneDayMax && timeIn >= (ONE_DAY) - 1) {
        return '24:00:00'
    }

    const hours = timeIn / (60 * 60);
    const remainder = timeIn % (60 * 60);
    const minutes = remainder / 60;
    const seconds = remainder % 60;
    const hoursLeadingZero = hours < 10 ? '0' : '';
    const minutesLeadingZero = minutes < 10 ? '0' : '';
    const secondsLeadingZero = seconds < 10 ? '0' : '';

    if (!hideSeconds) {
        return `${hoursLeadingZero}${Math.floor(hours)}:${minutesLeadingZero}${Math.floor(minutes)}:${secondsLeadingZero}${seconds}`;
    } else {
        return `${hoursLeadingZero}${Math.floor(hours)}:${minutesLeadingZero}${Math.floor(minutes)}`;
    }
}

export default convertToHoursMinutesAndSecondsDisplay;