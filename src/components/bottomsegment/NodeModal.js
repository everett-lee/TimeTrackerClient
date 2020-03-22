import React from 'react'
import { Modal, Button } from 'semantic-ui-react'

import SliderContainer from './slider/SliderContainer';

function NodeModal({ handleClose, isOpen, timeCommits, name }) {

  const renderTimeCommits = () => {
    return timeCommits
      .map((timeCommit, i) => {
        return (
          <div key={i}>
            <SliderContainer timeCommit={timeCommit} />
          </div>)
      });
  }

  return (
    <Modal open={isOpen}>
      <Modal.Header>{name}</Modal.Header>
      <Modal.Content>
        {renderTimeCommits()}
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