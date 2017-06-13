import React from 'react';
import { Checkbox } from 'react-bootstrap';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';

import { addContainer, CONTAINER_FORM_NAME, removeContainer, editContainer } from '../../../redux/modules/containers';
import { hideContainerForm } from '../../../redux/modules/containerForm';
import { ModalTypes } from '../../../util/formModal';
import FormModal from '../../common/FormModal';
import ValidatedInput from '../../common/ValidatedInput';


export const validate = values => {
	const errors = {};
  	//// required fields	
	['name'].forEach(field => {
		if (!values[field] || values[field] === '') {
			errors[field] = `${field} is required`;
		} 
	});
	return errors;
};

const submit = submitAction => (values, dispatch) => {
	return new Promise((resolve, reject) => dispatch(submitAction(values, resolve, reject)))
		.catch(error => {
			throw new SubmissionError(error);
		});
};

export const ContainerForm = ({ 
			initialValues,
			onHide, 
			serverErrors, 
			readOnly,
			showModal, 
			submitAction, 
			title,
			type, 
			submitButtonBsStyle, 
			submitButtonText, 
			//// provided by redux-form
	     	handleSubmit,
	     	reset,
	     	submitting }) => {
	if (showModal === ModalTypes.NONE) {
		return null;
	}
	return (<FormModal title={title} valid={true} show={showModal} errors={serverErrors} submitButtonBsStyle={submitButtonBsStyle} 
			submitButtonText={submitButtonText}
			onSubmit={handleSubmit(submit(submitAction))} 
			onHide={() => {
				reset(); 
				onHide();
			}}>
		<Field type="text" autoFocus id="name" name="name" label="Name" readOnly={readOnly} component={ValidatedInput} />
		<Field type="text" id="description" name="description" label="Description" readOnly={readOnly} component={ValidatedInput} />
		{ ModalTypes.CREATE === type && <Field id='keepOpen' name='keepOpen' component={Checkbox}>Keep Open</Field> }

	</FormModal>)
};
export const mapStateToProps = ({ containerForm: { errors, show }, containers: { containers, selectedId } }) => {
	const selectedContainer = containers[selectedId];
	let submitAction, title, submitButtonBsStyle;
	switch (show) {
		case ModalTypes.DELETE:
			submitAction = removeContainer;
			title = 'Delete';
			submitButtonBsStyle='danger';
			break;
		case ModalTypes.EDIT:
			submitAction = editContainer;
			title = 'Edit';
			submitButtonBsStyle='primary';
			break;
		case ModalTypes.CREATE:
			submitAction = addContainer;
			title = 'Add';
			submitButtonBsStyle='success';
			break;			
		case ModalTypes.NONE:
			//// do nothing
			break;
		default:
			console.error('Invalid Modal Type', show);
	}
	const submitButtonText = title;
	title += ' Container';
	const rtn = {
		serverErrors: errors,
		showModal: show !== ModalTypes.NONE,
		type: show,
		title,
		submitAction,
		submitButtonBsStyle,
		submitButtonText,
		readOnly: show === ModalTypes.DELETE,
		initialValues: show === ModalTypes.CREATE ? {} : selectedContainer
	};
	return rtn;
};

export const mapDispatchToProps = (dispatch) => {
  return {
    onHide: () => {
      dispatch(hideContainerForm());
    }
  };
};

const form = reduxForm({
	form: CONTAINER_FORM_NAME,
	validate,
	enableReinitialize: true
});

export default connect(mapStateToProps, mapDispatchToProps)(form(ContainerForm));
