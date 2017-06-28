// import expect from 'expect';
import reducer, { initialState, REQUEST_CONTAINERS } from '../../../src/redux/modules/containers';


describe('containers', () => {

  //// reducer
  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {})
      ).toEqual(initialState);
    });

    it('should handle REQUEST_CONTAINERS.SUCCESS', () => {
    const id = 0;
  	const items = [{
      				name: 'Freezer',
              id,
              description: ''
      }];
      const containers = {
        ...initialState,
        containers: {
          [id]: items[0]
        },
        selectedId: items[0].id+''
      }
      expect(
        reducer(initialState, {
          type: REQUEST_CONTAINERS.SUCCESS,
          payload: items
        })
      ).toEqual(containers);
    });
  });
});