import Compatibility from '../../src/util/Compatibility';

describe('Compatibility', () => {
	it('works', () => {
		expect(Compatibility.isDateSupported()).toBe(false);
	});
});