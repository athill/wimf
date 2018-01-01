import React from 'react';
import { shallow } from 'enzyme';
import faker from 'faker';
import sinon from 'sinon';

import FormModal, { ErrorDisplay } from '../../../components/common/FormModal';

describe('ErrorDisplay', () => {
	it('works', () => {
		const errors = [ faker.lorem.words(), faker.lorem.words() ];
		const output = shallow(<ErrorDisplay errors={errors} />);
		expect(output.is('Alert')).toBe(true);
		const items = output.find('li');
		expect(items.get(0).props.children).toBe(errors[0]);
		expect(items.get(1).props.children).toBe(errors[1]);
	});

	it('returns null if no errors', () => {
		const output = shallow(<ErrorDisplay errors={[]} />);
		expect(output.getElement()).toBe(null);
	});	
});

describe('FormModal', () => {
	const title = faker.lorem.words();
	it('works', () => {

		const output = shallow(<FormModal show={true} title={title} valid={true}>foo</FormModal>);
		//// header
		const header = output.find('ModalHeader');
		expect(header.length).toBe(1);
		const modalTitle = header.find('ModalTitle');
		expect(modalTitle.length).toBe(1);
		expect(modalTitle.props().children).toBe(title);
		//// body
		const form = output.find('form');
		expect(form.length).toBe(1);
		const body = form.find('ModalBody');
		expect(body.length).toBe(1);
		expect(body.props().children).toBe('foo');
		//// footer
		const footer = output.find('ModalFooter');
		expect(footer.length).toBe(1);
		const errors = footer.find('ErrorDisplay');
		expect(errors.length).toBe(1);
		const submit = footer.find('#confirmModal');
		expect(submit.length).toBe(1);
		expect(submit.props().children).toBe('Submit');
		const cancel = footer.find('#cancelModal');
		expect(cancel.length).toBe(1);
		expect(cancel.props().children).toBe('Cancel');
	});

	// it('shows a spinner if submitting', () => {
	// 	const output = shallow(<FormModal title={title} valid={true} submitting={true}>foo</FormModal>);
	// 	expect(output.find('Spinner').length).toBe(1);
	// });

	it('calls onSubmit on submit', () => {
		const onSubmit = sinon.spy();
		const output = shallow(<FormModal title={title} valid={true} onSubmit={onSubmit}>foo</FormModal>);
		const form = output.find('form');
		form.simulate('submit', { preventDefault: e => e });
		expect(onSubmit.calledOnce).toBe(true);
	});

	it('calls onHide on cancel', () => {
		const onHide = sinon.spy();
		const output = shallow(<FormModal title={title} valid={true} onHide={onHide}>foo</FormModal>);
		const cancelButton = output.find('#cancelModal');
		cancelButton.simulate('click', { preventDefault: e => e });
		expect(onHide.calledOnce).toBe(true);
	});	

	it('calls onHide on modal hide', () => {
		const onHide = sinon.spy();
		const output = shallow(<FormModal title={title} valid={true} onHide={onHide}>foo</FormModal>);
		output.simulate('hide');
		expect(onHide.calledOnce).toBe(true);
	});		
});