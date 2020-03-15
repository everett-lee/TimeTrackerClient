import React, { useContext } from 'react'
import { Modal, Button } from 'semantic-ui-react'
import { useQuery } from '@apollo/react-hooks';

import Queries from '../../graphql/Queries';
import { AuthenticationContext } from '../providers/AuthenticationProvider';
import Slider from './Slider';

function NodeModal({ handleClose, isOpen, nodeId }) {
  const { user } = useContext(AuthenticationContext);
  const ownerId = user.id;

  // Retrieve data for all clients and tasks
  const { loading, error, data, refetch } = useQuery(Queries.ALL_TIMECOMMITS, {
    variables: { ownerId, subtaskId: nodeId - 1 },
  });

  // Don't render a result for the task node
  if (loading || nodeId === 1) return null;
  if (error) console.error(error);

  const renderTimeCommits = ({ getAllTimeCommits }) => {
    return getAllTimeCommits
      .map((timeCommit, i) => {
        return (
          <div key={i}>
            <Slider timeCommit={timeCommit} />
          </div>)
      });
  }

  return (
    <Modal open={isOpen}>
      <Modal.Content>
        {renderTimeCommits(data)}
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleClose} >
          Close
          </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default NodeModal