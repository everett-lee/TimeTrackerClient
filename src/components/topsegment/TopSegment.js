import React, { useContext } from 'react';

import { Segment } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';

import { AuthenticationContext } from '../providers/AuthenticationProvider';
import Queries from '../../graphql/Queries'
import TimerBox from "./TimerBox";
import DropdownSegment from "./DropdownSegment";

function TopSegment() {
  const authenticationContext = useContext(AuthenticationContext);

  const { loading, error, data, refetch } = useQuery(Queries.ALL_CLIENTS(authenticationContext.user.id));

  if (loading) return null;
  if (error) console.log(error);

  const clients = data.getAllClients.map((el, index) => ({
    key: index,
    text: el.clientName,
    value: el.clientName
  })
  );

  return (
    <Segment.Group horizontal id="topSegment">
      <Segment id="selectionBox">
        <DropdownSegment refetch={refetch} clients={clients} />
      </Segment>
      <TimerBox></TimerBox>
    </Segment.Group>
  );
}

export default TopSegment;
