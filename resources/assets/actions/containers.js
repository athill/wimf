import * as types from '../constants/ActionTypes'

export const fetchContainersIfNeeded = () => {
	return { type: types.FETCH_CONTAINERS, payload: null };
}
