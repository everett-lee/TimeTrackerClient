import React from 'react';
import { ResponsiveNetwork } from '../nivo/network';
import TEMP_DATA from './TempData';

function BottomSegment() {

    const MyResponsiveNetwork = ( {nodes, links }) => (
        <div id="graphDiv">
            <ResponsiveNetwork
                nodes={nodes}
                links={links}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                repulsivity={6}
                iterations={60}
                nodeColor={function (t) { return t.color }}
                nodeBorderWidth={1}
                nodeBorderColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
                linkThickness={function (t) { return 2 * (2 - t.source.depth) }}
                motionStiffness={160}
                motionDamping={12}
            />
        </div>
    );

    return MyResponsiveNetwork(TEMP_DATA);
}

export default BottomSegment;