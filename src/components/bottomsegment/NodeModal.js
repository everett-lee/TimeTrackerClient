import React, { useState } from 'react'
import { Modal, Message, Button, Statistic } from 'semantic-ui-react'

import SliderContainer from './slider/SliderContainer';
import Sleep from './../utils/sleep';

/**
 * Display a list of timecommits associated with each subtask
 * and enable update of committed time by adjusting the slider
 */
function NodeModal({ handleClose, isOpen, timeCommits, name, totalTime, getTimecommits }) {
  const [messageText, setMessageText] = useState('');
  const [isSuccessMessage, setIsSuccessMessage] = useState(true);

  /**
   * Indicate the result of the updateTimeCommit mutation
   * to the user
   * 
   * @param {Boolean} successful
   * @param {String} messageText 
   */
  const setMessage = (successful, messageText) => {
    if (!successful) {
      setIsSuccessMessage(false);
    }

    setMessageText(messageText);

    Sleep(1000).then(() => {
      setIsSuccessMessage(true);
      setMessageText('');
    })

  }

  const renderMessage = () => {
    if (messageText && isSuccessMessage) {
      return (
        <Message positive>
          {messageText}
        </Message>
      );
    }
    else if (messageText && !isSuccessMessage) {
      return (
        <Message negative>
          {messageText}
        </Message>
      );
    }
  }

  const renderTimeCommits = () => {
    return timeCommits
      .map((timeCommit, i) => {
        return (
          <div key={i}>
            <SliderContainer
              timeCommit={timeCommit}
              setMessage={setMessage}
              getTimecommits={getTimecommits}
            />
          </div>)
      });
  }

  return (
    <Modal open={isOpen}>
      <Modal.Header className="nodeModalHeader">
        <Statistic label={name} value={totalTime} />
      </Modal.Header>
      <Modal.Content scrolling>
        {renderTimeCommits()}
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleClose} >
          Close
        </Button>
      </Modal.Actions>
      {renderMessage()}
    </Modal>
  );
}

export default NodeModal