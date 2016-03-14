import expect from 'expect';
import _ from 'lodash';

import  * as du from '../../util/DateUtils';

/*
 'MM-DD-YY',
  'MM-DD-YYYY',
  'MM/DD/YY',
  displayDateFormat,
  isoFormat
*/

describe('DateUtils', () => {
	const validFormats = ['03/14/2016', '03-14-2016', '03/14/16', '03-14-16', '2016-03-14'];
	const invalidFormats = ['March 14th, 2016'];

	describe('isValidDate', () => {
		validFormats.forEach(format => {
			it(`should return true for ${format}`, () => {
				expect(du.isValidDate(format)).toBe(true);
			});
		});
		invalidFormats.forEach(format => {
			it(`should return false for ${format}`, () => {
				expect(du.isValidDate(format)).toBe(false);
			});
		});		
	});

	describe('getDisplayFormat', () => {
		validFormats.forEach(format => {
			it(`should return ${validFormats[0]} format for ${format}`, () => {
				expect(du.getDisplayFormat(format)).toBe(validFormats[0]);
			});
		});
		it('should return empty string for invalid date', () => {
			expect(du.getDisplayFormat(invalidFormats[0])).toBe('');
		});
	});

	describe('getIsoFormat', () => {
		validFormats.forEach(format => {
			it(`should return ${validFormats[4]} format for ${format}`, () => {
				expect(du.getIsoFormat(format)).toBe(validFormats[4]);
			});
		});
		it('should return empty string for invalid date', () => {
			expect(du.getIsoFormat(invalidFormats[0])).toBe('');
		});
	});	
});