import React from 'react';
import { Alert } from 'react-bootstrap';

const ContainerWelcome = ({ name }) => (
    <Alert bsStyle="success">
      <h4>Your {name} is empty!</h4>
      <p>Click on the green plus sign in the upper right to start adding items.</p>
    </Alert>
);

export default ContainerWelcome;