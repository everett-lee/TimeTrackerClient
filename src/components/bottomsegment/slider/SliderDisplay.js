import React, { useContext } from 'react';
import { Segment, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks';
import { AuthenticationContext } from '../../providers/AuthenticationProvider';

import Mutations from '../../../graphql/Mutations'

function SliderDisplay({ date, time, timeCommitId, displayTime }) {
    const { user: { id: userId } } = useContext(AuthenticationContext);

    const [updateTime] = useMutation(Mutations.UPDATE_TIMECOMMIT);

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