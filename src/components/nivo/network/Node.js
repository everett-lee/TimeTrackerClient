import React, { useContext, useState, memo } from 'react'
import PropTypes from 'prop-types'

import { useLazyQuery } from '@apollo/react-hooks';

import Queries from '../../../graphql/Queries';
import { AuthenticationContext } from '../../providers/AuthenticationProvider';
import NodeModal from '../../bottomsegment/NodeModal';
import ConvertToHoursMinutesAndSeconds from '../../topsegment/timercomponents/ConvertToHoursMinutesAndSeconds';

const Node = ({ x, y, radius, color, borderWidth, borderColor, scale = 1, node }) => {
    const { user } = useContext(AuthenticationContext);
    const ownerId = user.id;
    const [modelOpen, setModelOpen] = useState(false);
    const [timeCommits, setTimecommits] = useState([]);
    const [totalTime, setTotalTime] = useState(0);

    const [getTimecommits] = useLazyQuery(Queries.ALL_TIMECOMMITS, {
        variables: { ownerId, subtaskId: node.id - 1 },
        fetchPolicy: 'cache-and-network',
        onCompleted: data => {
            setTimecommits(data.getAllTimeCommits);
            setTotalTime(calculateTotalTime(data.getAllTimeCommits));
            setModelOpen(true);
        }
    });

    const handleOpenModal = () => {
        // Don't call for task node 
        if (node.id !== 1) {
            getTimecommits();
        }
    }

    const handleCloseModal = () => {
        setModelOpen(false);
    }

    const calculateTotalTime = (timeCommits) => {
        if (!timeCommits.length || !timeCommits) return 0;

        return timeCommits
        .map(item => item.time)
        .reduce((total, time) => total + time)
    }

    return (
        <React.Fragment>
            <circle
                onClick={handleOpenModal}
                transform={`translate(${x},${y}) scale(${scale})`}
                r={radius}
                fill={color}
                strokeWidth={borderWidth}
                stroke={borderColor}
            >
            </circle>
            <NodeModal
                handleClose={handleCloseModal}
                isOpen={modelOpen}
                timeCommits={timeCommits}
                totalTime={ConvertToHoursMinutesAndSeconds(totalTime, false, false)}
                name={node.name} 
                getTimecommits={getTimecommits}/>
        </React.Fragment>
    )
}

Node.propTypes = {
    node: PropTypes.object.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,
    scale: PropTypes.number,
}

export default memo(Node)
