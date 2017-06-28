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
  	const items = [{
      				name: 'Freezer',
              id: 0,
              description: ''
      }];
      const containers = {
        items,
        selected: items[0]
      }
      expect(
        reducer(initialState, {
          type: REQUEST_CONTAINERS.SUCCESS,
          payload: containers
        })
      ).toEqual(containers);
    });
  });
});