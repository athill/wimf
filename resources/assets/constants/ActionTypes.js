const constantStrings = [
	'FETCH_CONTAINERS',
	'REQUEST_CONTAINERS',
	'RECEIVE_CONTAINERS',
	'REQUEST_ITEMS',
	'RECEIVE_ITEMS',
	'ADD_ITEM'
];

const constants = {};

constantStrings.map(string => constants[string] = string);

export default constants;