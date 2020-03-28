import React, { useContext } from 'react';
import { Segment, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks';

import { AuthenticationContext } from '../../providers/AuthenticationProvider';
import { GraphQLContext } from '../../providers/GraphQLProvider';
import { TaskContext } from '../../providers/TaskProvider';

import Mutations from '../../../graphql/Mutations'

function SliderDisplay({ date, time, timeCommitId, displayTime, setMessage, getTimecommits }) {
    const { user: { id: userId } } = useContext(AuthenticationContext);
    const { activeTaskId, setActiveTask } = useContext(TaskContext);
    const { getTask } = useContext(GraphQLContext);

    const [updateTime] = useMutation(Mutations.UPDATE_TIMECOMMIT,
        {
            onCompleted: () => {
                setMessage(true, 'Update successful');
                getTask({
                    variables:
                    {
                      'ownerId': userId,
                      'taskId': activeTaskId
                    },
                    onCompleted: data => {
                      setActiveTask(data.getTask)
                    }
                  })
                getTimecommits()
            },
            onError: (e) => {
                setMessage(false, 'Update failed');
            }
        });

    const callUpdateTime = () => {
        // if all fields are completed
        if (updateTime) {
            updateTime({
                variables:
                {
                    'ownerId': userId,
                    'timeCommitId': timeCommitId,
                    'time': Number(time)
                }
            });
        }
    }

    return (
        <Segment.Group horizontal>
            <Segment textAlign='center' size='large'>{new Date(date).toDateString()}</Segment>
            <Segment textAlign='center' size='large'>{displayTime}</Segment>
            <Segment textAlign='center'>
                <Button size='medium' onClick={callUpdateTime}>Update</Button>
            </Segment>
        </Segment.Group>
    );
}

export default SliderDisplay;