import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';

import { Spinner } from './common';

export const ErrorDisplay = ({ errors }) => {
  if (errors && !Array.isArray(errors)) {
    errors = [errors];
  }
  if (errors && errors.length > 0) {
    return (
      <Alert bsStyle="danger">
        <ul id="modal-errors">
          { errors.map((error, index) => <li key={index}>{error}</li>) }
        </ul>
      </Alert>
    );
  } else {
    return null;
  }
};
ErrorDisplay.displayName = 'ErrorDisplay';

const FormModal = ({ children, errors, title, valid, onHide = () => {}, onSubmit = () => {}, show = true,
    submitting = false, submitButtonBsStyle='primary', submitButtonText = 'Submit', ...otherProps }) => {
  if (show) {
    return (
      <Modal onHide={() => { if(!submitting) { onHide(); } }} show={true} {...otherProps}>
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
  } else {
    return null;
  }
};

FormModal.displayName = 'FormModal';

FormModal.propTypes = {
  errors: PropTypes.array,
  onHide: PropTypes.func,
  onSubmit: PropTypes.func,
  submitButtonText: PropTypes.string,
  submitting: PropTypes.bool,
  title: PropTypes.string.isRequired,
  valid: PropTypes.bool.isRequired
};

export default FormModal;
