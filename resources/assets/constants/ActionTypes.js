const constantStrings = [
	'FETCH_CONTAINERS',
	'REQUEST_CONTAINERS',
	'RECEIVE_CONTAINERS',
	'REQUEST_ITEMS',
	'RECEIVE_ITEMS',
	'ADD_ITEM',
	'REQUEST_USER_INFO',
	'RECEIVE_USER_INFO',
	//// add form
	'TOGGLE_ADD_FORM',
	'SHOW_ADD_FORM',
	'HIDE_ADD_FORM'
];

const constants = {};

constantStrings.map(string => constants[string] = string);

export default constants;