import moment from 'moment';

import Compatibility from './Compatibility';

export const displayDateFormat = 'MM/DD/YYYY';
export const isoFormat = 'YYYY-MM-DD';
export const momentFormats = [
  'MM-DD-YY',
  'MM-DD-YYYY',
  'MM/DD/YY',
  displayDateFormat,
  isoFormat
];

export const momentize = date => (
	date instanceof moment ? date : moment(date, momentFormats)
);

export const isValidDate = date => (
	momentize(date).isValid()
);

export const getDisplayFormat = date => (
	isValidDate(date) ? momentize(date).format(displayDateFormat) : ''
);

export const getIsoFormat = date => (
	isValidDate(date) ? momentize(date).format(isoFormat) : ''
);

export const getValueFormat = date => (
	Compatibility.isDateSupported() ? getIsoFormat(date) : getDisplayFormat(date)
);
