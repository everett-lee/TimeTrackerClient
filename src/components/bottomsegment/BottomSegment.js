import React, { useContext } from 'react';
import { ResponsiveNetwork } from '../nivo/network';
import { Message } from 'semantic-ui-react'

import { TaskContext } from '../providers/TaskProvider';
import { GraphQLContext } from '../providers/GraphQLProvider';

/**
 * Contains the graph components and modals
 * associated with each subtask/graph node
 */
function BottomSegment() {
    const { nodes, links } = useContext(TaskContext);
    const { errorMessage } = useContext(GraphQLContext);

    const renderMessage = (message) => {
        if (message) {
            return (
                <Message negative>
                    <Message.Header className='graphMessage'>
                        {message}
                    </Message.Header>
                </Message>
            );
        }
    }

    const MyResponsiveNetwork = (nodes, links) => (

        <div id='graphDiv'>
            <ResponsiveNetwork
                nodes={nodes}
                links={links}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                repulsivity={1000}
                iterations={60}
                nodeColor={function (t) { return t.color }}
                nodeBorderWidth={1}
                nodeBorderColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
                linkThickness={function (t) { return 2 * (2 - t.source.depth) }}
                motionStiffness={160}
                motionDamping={12}
            />
            {renderMessage(errorMessage)}
        </div>
    );

    return MyResponsiveNetwork(nodes, links);
}

export default BottomSegment;