const convertToMinutesAndSecondsDisplay = (timeIn, hideSeconds) => {
    // Time will stop updating after 23:59
    if (timeIn >= (60 * 60 * 24) - 1) {
        return '23:59:59'
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

export default convertToMinutesAndSecondsDisplay;