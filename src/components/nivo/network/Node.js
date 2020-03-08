import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'

import NodeModal from '../../bottomsegment/NodeModal';

const Node = ({ x, y, radius, color, borderWidth, borderColor, scale = 1, node }) => {
    const [modelOpen, setModelOpen] = useState(false);

    const handleToggleModalState = () => {
        setModelOpen(!modelOpen);
    }

    return (

        <circle
            onClick={handleToggleModalState}
            transform={`translate(${x},${y}) scale(${scale})`}
            r={radius}
            fill={color}
            strokeWidth={borderWidth}
            stroke={borderColor}
        >
            <NodeModal
                trigger={handleToggleModalState}
                isOpen={modelOpen}
                nodeId={node.id} />
        </circle>
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
