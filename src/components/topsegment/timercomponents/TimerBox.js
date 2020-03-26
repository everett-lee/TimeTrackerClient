import React, { useState, useContext } from 'react';
import { Segment, Grid, Button, Message } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';

import { GraphQLContext } from '../../providers/GraphQLProvider';

import { callTimer, resetTimer } from './Timer';
import Mutations from '../../../graphql/Mutations';
import { AuthenticationContext } from '../../providers/AuthenticationProvider';
import { TaskContext } from '../../providers/TaskProvider';
import convertToHoursMinutesAndSecondsDisplay from './ConvertToHoursMinutesAndSeconds';
import TotalTimeDisplay from './TotalTimeDisplay';

function TimerBox() {
    const { user: { id: userId } } = useContext(AuthenticationContext);
    const { activeSubtaskId, activeTaskId, tasks, activeTask, setActiveTask } = useContext(TaskContext);
    const { getTask } = useContext(GraphQLContext);

    const [time, setTime] = useState(0);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState(false);

    const [createOrUpdateTimeCommit] = useMutation(Mutations.CREATE_OR_UPDATE_TIMECOMMIT, {
        onCompleted: () => getTask({
            variables:
            {
                'ownerId': userId,
                'taskId': activeTaskId
            },
            onCompleted: data => {
                setActiveTask(data.getTask)
            }
        })
    });

    const callCreateOrUpdateTimeCommit = () => {
        // If all fields are assigned
        if (time > 0 && activeSubtaskId) {
            createOrUpdateTimeCommit({
                variables:
                {
                    'ownerId': userId,
                    'subtaskId': activeSubtaskId,
                    'time': time
                }
            });
            handleResetTimerClick();
        } else {
            const message = time === 0 ? 'Please start the timer before saving' : 'Please select a subtask'
            setMessage(message);
            handleShowMessageStateChange();
        }
    }

    const handleTimerClick = () => {
        if (activeSubtaskId) {
            callTimer(setTime);
        } else {
            setMessage('Please select a subtask');
            handleShowMessageStateChange();
        }
    }

    const handleResetTimerClick = () => {
        resetTimer(setTime);
    }

    const handleShowMessageStateChange = () => {
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 1000);
    }

    const resultMessage = () => {
        if (showMessage) {
            return (
                <Message negative id='selectSubtaskPrompt'>
                    <Message.Header>{message}</Message.Header>
                </Message>
            );
        }
    }

    return (
        <Segment.Group id='timerBox'>
            <TotalTimeDisplay activeTask={activeTask} activeTaskId={activeTaskId} tasks={tasks} />
            <Segment >
                <Grid columns={2} stackable textAlign='center'>
                    <Grid.Column id='timerCol'>
                        <div className='counterWrapper'>
                            <button className='timerButton' onClick={handleTimerClick}>{convertToHoursMinutesAndSecondsDisplay(time, false, true)}
                            </button>
                        </div>
                    </Grid.Column>
                    <Grid.Column id='timerCol'>
                        <Button.Group id='timerButtons'>
                            <Button size='huge' basic color='green' onClick={callCreateOrUpdateTimeCommit}>Save</Button>
                            <Button size='huge' basic color='green' onClick={handleResetTimerClick}>Reset</Button>
                        </ Button.Group>
                    </Grid.Column>
                </Grid>
                {resultMessage()}
            </Segment>
        </Segment.Group>
    );
}

export default TimerBox;
