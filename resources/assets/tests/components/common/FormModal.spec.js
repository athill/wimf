import React from 'react';
import { shallow } from 'enzyme';
import faker from 'faker';

import FormModal from '../../../src/components/common/FormModal';

describe('FormModal', () => {
	const title = faker.lorem.words();
	it('works', () => {

		const output = shallow(<FormModal title={title} valid={true}>foo</FormModal>);
		//// header
		const header = output.find('ModalHeader');
		expect(header.length).toBe(1);
		const modalTitle = header.find('ModalTitle');
		expect(modalTitle.length).toBe(1);
		expect(modalTitle.children().node).toBe(title);
		//// body
		const form = output.find('form');
		expect(form.length).toBe(1);
		const body = form.find('ModalBody');
		expect(body.length).toBe(1);
		expect(body.children().node).toBe('foo');
		//// footer
		const footer = output.find('ModalFooter');
		expect(footer.length).toBe(1);
		const errors = footer.find('ErrorDisplay');
		expect(errors.length).toBe(1);
		const submit = footer.find('#confirmModal');
		expect(submit.length).toBe(1);
		expect(submit.children().node).toBe('Submit');
		const cancel = footer.find('#cancelModal');
		expect(cancel.length).toBe(1);
		expect(cancel.children().node).toBe('Cancel');
	});
});