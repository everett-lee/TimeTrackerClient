import React from 'react'
import PropTypes from 'prop-types'

import { Header, Modal } from 'semantic-ui-react'

const NodeModal = ({ trigger, isOpen }) => (
  <Modal onClick={trigger} open={isOpen}>
    <Modal.Header>Select a Photo</Modal.Header>
    <Modal.Content>
      hi
      </Modal.Content>
  </Modal>
)

export default NodeModal