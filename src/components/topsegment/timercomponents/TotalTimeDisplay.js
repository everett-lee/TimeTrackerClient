import React from 'react';
import { Segment, Statistic } from 'semantic-ui-react';

import convertToHoursMinutesAndSecondsDisplay from './ConvertToHoursMinutesAndSeconds';

function TotalTimeDisplay({ activeTask, activeTaskId, tasks }) {
    let taskForDisplay;

    // The task has not been updated by the timer yet,
    // so use the current task state
    if (!activeTask && activeTaskId && tasks) {
        taskForDisplay = tasks
            .filter(task => Number(task.id) === Number(activeTaskId))[0];
        
    } else if (activeTask) {
        taskForDisplay = activeTask;
    }

    const getResultDisplay = () => {
        // If task has been retrieved
        if (taskForDisplay) {
            const { taskName, totalTime } = taskForDisplay;

            return <Statistic label={taskName} value={convertToHoursMinutesAndSecondsDisplay(totalTime, false, false)} />
        } else {
            return <Statistic label='Select a task' value='00:00:00' />
        }
    }

    return (
        <Segment id='totalTimeDisplay'>
            {getResultDisplay()}
        </Segment>);
}

export default TotalTimeDisplay;
