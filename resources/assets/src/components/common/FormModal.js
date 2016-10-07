import _ from 'lodash';
import React from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';

import { NoOp, Spinner } from './common';

const ErrorDisplay = ({ errors }) => {
  if (errors && _.isArray(errors) && errors.length > 0) {
    return (
      <Alert bsStyle="danger">
        <ul id="modal-errors">
          { errors.map((error, index) => <li key={index}>{error}</li>) }
        </ul>
      </Alert>
    );
  } else {
    return <NoOp />;
  }
};

const FormModal = ({ children, errors, title, valid, onHide = () => {}, onSubmit = () => {}, 
    submitting = false, submitButtonBsStyle='primary', submitButtonText = 'Submit', ...otherProps }) => (
  <Modal onHide={() => { if(!submitting) { onHide(); } }} {...otherProps}>
    <Modal.Header>
      <Modal.Title>{ title }</Modal.Title>
    </Modal.Header>

    <form onSubmit={e => { e.preventDefault(); onSubmit(); }} className='form-horizontal'>
       <Modal.Body>
        { children } 
      </Modal.Body>  
      <Modal.Footer>
        <ErrorDisplay errors={errors} />
        {submitting && <Spinner />} {' '}
        <Button id="confirmModal" bsStyle={submitButtonBsStyle} type="submit" disabled={!valid || submitting}>
          { submitButtonText }
        </Button>
        <Button id="cancelModal" className='cancel' onClick={onHide} disabled={submitting}>
          Cancel
        </Button>
      </Modal.Footer> 
    </form>
  </Modal>
);

FormModal.propTypes = {
  errors: React.PropTypes.array,
  onHide: React.PropTypes.func,
  onSubmit: React.PropTypes.func,
  submitButtonText: React.PropTypes.string,
  submitting: React.PropTypes.bool,
  title: React.PropTypes.string.isRequired,
  valid: React.PropTypes.bool.isRequired
};

export default FormModal;
