// export const FETCH_CONTAINERS = 'FETCH_CONTAINERS'
// export const REQUEST_CONTAINERS = 'REQUEST_CONTAINERS';
// export const RECEIVE_CONTAINERS = 'RECEIVE_CONTAINERS';

// export const ADD_TODO = 'ADD_TODO'
// export const DELETE_TODO = 'DELETE_TODO'
// export const EDIT_TODO = 'EDIT_TODO'
// export const COMPLETE_TODO = 'COMPLETE_TODO'
// export const COMPLETE_ALL = 'COMPLETE_ALL'
// export const CLEAR_COMPLETED = 'CLEAR_COMPLETED'

const constantStrings = ['FETCH_CONTAINERS', 'REQUEST_CONTAINERS', 'RECEIVE_CONTAINERS',
	'ADD_TODO', 'DELETE_TODO', 'EDIT_TODO', 'COMPLETE_TODO', 'COMPLETE_ALL', 'CLEAR_COMPLETED'];

const constants = {};

constantStrings.map(string => constants[string] = string);

export default constants;