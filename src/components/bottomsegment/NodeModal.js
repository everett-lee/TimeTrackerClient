import React, { useContext } from 'react'
import { Modal } from 'semantic-ui-react'
import { useQuery } from '@apollo/react-hooks';

import Queries from '../../graphql/Queries';
import { AuthenticationContext } from '../providers/AuthenticationProvider';

function NodeModal({ trigger, isOpen, nodeId }) {
  const { user } = useContext(AuthenticationContext);
  const ownerId = user.id;

  console.log(">>>>>>>>>>>>")
  console.log(ownerId)
  console.log(nodeId)
  console.log(">>>>>>>>>>>>")

  // Retrieve data for all clients and tasks
  const { loading, error, data, refetch } = useQuery(Queries.ALL_TIMECOMMITS, {
    variables: { ownerId, subtaskId: nodeId },
  });

  // Don't render a result for the task node
  if (loading || nodeId === 1) return null;
  if (error) console.error(error);

  console.log(data);

  return (
    <Modal onClick={trigger} open={isOpen}>
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content>
        {nodeId}
      </Modal.Content>
    </Modal>
  );
}

export default NodeModal