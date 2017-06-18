import faker from 'faker';

import { defaultFormModalHandler, ModalTypes } from '../../src/util/formModal';

describe('formModal', () => {
	const state = {
		show: ModalTypes.NONE,
		selected: null
	};
	const type = faker.lorem.word().toUpperCase();
	const payload = {
		name: faker.lorem.words()
	};
	describe('defaultFormModalHandler', () => {
		it('toggles add form visible', () => {
			const result = defaultFormModalHandler(type, state, {
				type: `TOGGLE_ADD_${type}_FORM`,
				payload
			});
			expect(result).toEqual({
				show: ModalTypes.CREATE,
				selected: undefined
			});
		});

		it('toggles add form hidden', () => {
			const result = defaultFormModalHandler(type, { ...state, show: ModalTypes.CREATE }, {
				type: `TOGGLE_ADD_${type}_FORM`,
				payload
			});
			expect(result).toEqual({
				show: ModalTypes.NONE,
				selected: undefined
			});
		});

		it('handles show delete', () => {
			const result = defaultFormModalHandler(type, state, {
				type: `SHOW_DELETE_${type}_FORM`,
				payload
			});
			expect(result).toEqual({
				show: ModalTypes.DELETE,
				selected: payload
			});
		});

		it('handles show edit', () => {
			const result = defaultFormModalHandler(type, state, {
				type: `SHOW_EDIT_${type}_FORM`,
				payload
			});
			expect(result).toEqual({
				show: ModalTypes.EDIT,
				selected: payload
			});
		});

		it('hides the form', () => {
			const result = defaultFormModalHandler(type, state, {
				type: `HIDE_${type}_FORM`,
				payload
			});
			expect(result).toEqual({
				show: ModalTypes.NONE,
				selected: undefined
			});
		});	

		it('returns unmodified state if unmatched', () => {
			const result = defaultFormModalHandler(type, state, {
				type: 'FOO_BAR',
				payload
			});
			expect(result).toEqual(state);
		});

	});
});