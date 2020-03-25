import React, { useContext } from 'react';
import { Segment, Statistic } from 'semantic-ui-react';

import { TaskContext } from '../../providers/TaskProvider';
import convertToHoursMinutesAndSecondsDisplay from './ConvertToHoursMinutesAndSeconds';

function TotalTimeDisplay() {
    const { activeTaskId, tasks } = useContext(TaskContext);

    const getResultDisplay = () => {
        let activeTask;

        if (activeTaskId && tasks) {
            activeTask = tasks.filter(task => Number(task.id) === Number(activeTaskId))[0];
        }

        // If task has been retrieved
        if (activeTask) {
            const { taskName, totalTime } = activeTask;

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
