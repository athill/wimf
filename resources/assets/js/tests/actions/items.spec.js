import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';

import * as actions from '../../actions/items';
import * as types from '../../constants/ActionTypes';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

const container = {
	id: 0
};
describe('items actions', () => {
	describe('add', () => {
	  afterEach(() => {
	    // nock.cleanAll()
	  });

	  // it('creates ADD_ITEM_SUCCESS when fetching todos has been done', (done) => {
	  // 	const item = {
			// name: "2",
			// quantity: "3"
	  // 	};

	  // 	const formItem = {
	  // 		...item,
	  // 		category: 'foo',
	  // 		container_id: 1
	  // 	};

	  // 	const returnItem = {
	  // 		...item,
			// category_id: 75,
			// comment: "",
			// id: 77
	  // 	};

	  	// const mock = sinon.mock(axios);
	  	// {name: '2', quantity: '3', category: 'foo', container_id: 0}

	    // fetchMock.mock('/api/items', 'POST', { body: returnItem });
	      // .post('', formItem)
	      // .reply(200, { body: returnItem })

	  //   const expectedActions = [
	  //     { type: types.ADD_ITEM, payload: undefined },
	  //     { type: types.ADD_ITEM_SUCCESS, payload: returnItem }
	  //   ]
	  //   const store = mockStore({containers: {selected: container } }, expectedActions, done)
	  //   store.dispatch(actions.add(formItem));
	  // });

	  it('should return a function', () => {
	    const expectedAction = {

	    };
	    const item = {};
	    const result = actions.add(item);
	    expect(result).toBeA('function');
	    // expect(result).toEqual(expectedAction);
	  });

	  it('should return something', () => {
	  	const container = {
	  		id: 0
	  	};
	    const getState = () => ({containers: {selected: container } });
	    const dispatch = expect.createSpy();
	    const item = {};
	    actions.add(item)(dispatch, getState);
	    expect(dispatch).toHaveBeenCalledWith({type: 'ADD_ITEM', payload: undefined});
	  });
	});
});