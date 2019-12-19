import React, { useContext } from 'react';

import { Segment } from 'semantic-ui-react';

import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';

import { AuthenticationContext } from '../providers/AuthenticationProvider';
import TimerBox from "./TimerBox";
import DropdownSegment from "./DropdownSegment";

function TopSegment() {
    const authenticationContext = useContext(AuthenticationContext);

    const ALL_CLIENTS = gql`
    {
      getAllClients(ownerId: 1) {
        clientName
        businessType
        location
      }
  }
  `;

    const { loading, error, data } = useQuery(ALL_CLIENTS);

    if (loading) return <p>Loading...</p>;
    if (error)  console.log(error + "the error")

    console.log(data + "the data")

    return (
        <Segment.Group horizontal id="topSegment">
            <Segment id="selectionBox">
                <DropdownSegment />
            </Segment>
            <TimerBox></TimerBox>
        </Segment.Group>
    );
}

export default TopSegment;
