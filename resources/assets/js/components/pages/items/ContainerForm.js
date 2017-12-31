import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';

import { addContainer, CONTAINER_FORM_NAME, hideContainerForm, removeContainer, editContainer } from '../../../modules/containers';
import { ModalTypes } from '../../../modules/utils';
import FormModal from '../../common/FormModal';
import ReduxFormCheckbox from '../../common/ReduxFormCheckbox';
import ValidatedInput from '../../common/ValidatedInput';


const  { DOM: { input } } = React;

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
			readOnly,
			showModal, 
			submitAction, 
			submitButtonBsStyle, 
			submitButtonText, 			
			title,
			type, 

			//// provided by redux-form
			error,
	     	handleSubmit,
	     	reset,
	     	submitting }) => {
	if (showModal === ModalTypes.NONE) {
		return null;
	}
	return (<FormModal title={title} valid={true} show={showModal} errors={error} submitButtonBsStyle={submitButtonBsStyle} 
			submitButtonText={submitButtonText}
			onSubmit={handleSubmit(submit(submitAction))} 
			onHide={() => {
				reset(); 
				onHide();
			}}>
		<Field type="text" autoFocus id="name" name="name" label="Name" readOnly={readOnly} component={ValidatedInput} />
		<Field type="text" id="description" name="description" label="Description" readOnly={readOnly} component={ValidatedInput} />
		{ ModalTypes.CREATE === type && <Field name='keepOpen' component={ReduxFormCheckbox}>Keep Open</Field> }

	</FormModal>)
};
export const mapStateToProps = ({ containers: { containers, selectedId, showContainerForm }, form}) => {
	const selectedContainer = containers[selectedId];
	let submitAction, title, submitButtonBsStyle;
	switch (showContainerForm) {
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
			console.error('Invalid Modal Type', showContainerForm);
	}
	const submitButtonText = title;
	const error = form.container && form.container.error;
	title += ' Container';
	const rtn = {
		error,
		showModal: showContainerForm !== ModalTypes.NONE,
		type: showContainerForm,
		title,
		submitAction,
		submitButtonBsStyle,
		submitButtonText,
		readOnly: showContainerForm === ModalTypes.DELETE,
		initialValues: showContainerForm === ModalTypes.CREATE ? {} : selectedContainer
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
