import React, { useContext } from 'react';

import { Segment } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';

import { AuthenticationContext } from '../providers/AuthenticationProvider';
import queries from '../../queries/queries'
import TimerBox from "./TimerBox";
import DropdownSegment from "./DropdownSegment";


function TopSegment() {
  const authenticationContext = useContext(AuthenticationContext);

  const { loading, error, data } = useQuery(queries.ALL_CLIENTS(authenticationContext.user.id));

  if (loading) return <p>Loading...</p>;
  if (error) console.log(error + "the error")

  const clients = data.getAllClients.map((el, index) => ({
    key: index,
    text: el.clientName,
    value: el.clientName
  })
  );

  data.getAllClients.forEach(el => console.log(el))

  return (
    <Segment.Group horizontal id="topSegment">
      <Segment id="selectionBox">
        <DropdownSegment clients={clients} />
      </Segment>
      <TimerBox></TimerBox>
    </Segment.Group>
  );
}

export default TopSegment;
