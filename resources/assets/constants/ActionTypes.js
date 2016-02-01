const constantStrings = [
	//// containers
	'FETCH_CONTAINERS',
	'REQUEST_CONTAINERS',
	'RECEIVE_CONTAINERS',
	//// items
	'REQUEST_ITEMS',
	'RECEIVE_ITEMS',
	'ADD_ITEM',
	//// user
	'REQUEST_USER_INFO',
	'RECEIVE_USER_INFO',
	//// add form
	'TOGGLE_ADD_FORM',
	'SHOW_ADD_FORM',
	'HIDE_ADD_FORM',
	'CLEAR_ADD_FORM',
	'SET_ADD_FORM_ERROR'
];

const constants = {};

constantStrings.map(string => constants[string] = string);

export default constants;