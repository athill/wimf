import expect from 'expect';
import _ from 'lodash';

import LocalPersistedStore, * as localStore from '../../src/store/LocalPersistedStore';

const resolve = response => { console.log('resolved', response); return 0; },
	reject = response => { console.log('rejected', response); return 1; },
	container_id = 99999999;

const getDummyItem = () => {
	return {
		name: 'dummyName',
		category: 'dummyCategory',
		quantity: '1 lb',
		container_id
	};
};

const getDummyContainer = () => ({
	name: 'dummyContainer',
	description: 'dummyContainerDescription'
});

describe('LocalPersistedStore', () => {
	beforeEach(function() {
		localStore.resetStore();
	});

	describe('persistCurrentUser', () => {
		it('should return user with GET', () => {
			const user = localStore.getStore().user;
			expect(localStore.persistCurrentUser(resolve, reject, 'get')).toEqual(user);
		});
	});

	describe('persistContainers', () => {
		describe('GET', () => {
			it('should return list of containers with no id on GET', () => {
				const tmpContainer = localStore.getStore().containers[0];
				const expectedContainer = {
					name: tmpContainer.name,
					description: tmpContainer.description,
					id: tmpContainer.id
				};
				const expectedContainers = [expectedContainer];
				expect(localStore.persistContainers(resolve, reject, 'get')).toEqual(expectedContainers);
			});

			it('should return container by id on GET', () => {
				const container = localStore.getStore().containers[0];
				expect(localStore.persistContainers(resolve, reject, 'get', [container_id])).toEqual(container);
			});
		});
		describe('POST', () => {
			it('should add a container', () => {
				const test_container_id = 0,
					container = getDummyContainer();

				const result = localStore.persistContainers(resolve, reject, 'post', [], Object.assign({}, container));
				const expected = {
					name: 'dummyContainer', 
					description: 'dummyContainerDescription', 
					id: test_container_id, 
					categories: []
				};
				//// verify json response
				expect(result).toEqual(expected);
				//// verify store is updated
				const store = localStore.getStore();
				expect(store.containers).toInclude(expected);

			});
		});
		describe('PUT', () => {
			it('should update a container', () => {
				const test_container_id = 0,
					container = getDummyContainer();

				const result = localStore.persistContainers(resolve, reject, 'post', [], Object.assign({}, container));
				const updatedContainer = {
					name: 'updatedName',
					description: 'updatedDescription',
					id: test_container_id
				};
				const result2 = localStore.persistContainers(resolve, reject, 'put', [], updatedContainer);
				const expected = {
					...result,
					...updatedContainer
				};
				//// verify json response
				expect(result2).toEqual(expected);
				//// verify store is updated
				const store = localStore.getStore();
				expect(store.containers).toInclude(expected);
			});
		});
		describe('DELETE', () => {
			it('should delete a container', () => {
				//// create container
				const result = localStore.persistContainers(resolve, reject, 'post', [], Object.assign({}, getDummyContainer()));

				localStore.persistContainers(resolve, reject, 'delete', [result.id]);
				//// verify store is updated
				const store = localStore.getStore();
				expect(_.findIndex(store.containers, { id: result.id })).toBe(-1);
			});
		});		
	});

	describe('persistItems', () => {
		describe('POST', () => {
			it('should add an item', () => {
				const category_id = 0,
					item_id = 1,
					item = getDummyItem();

				const result = localStore.persistItems(resolve, reject, 'post', [], Object.assign({}, item));
				
				//// verify store
				const store = localStore.getStore();
				//// expected item
				const expectedStoreItem = {...item, id: item_id, category_id};
				delete(expectedStoreItem.container_id);
				delete(expectedStoreItem.category);
				//// expected store
				const expectedStore = localStore.getStorePristine();

				expectedStore.containers[0].categories = [{
					name: item.category,
					container_id,
					id: category_id,
					items: [expectedStoreItem]
				}];
				expect(store.containers).toEqual(expectedStore.containers);

				//// expected result
				const expectedResultItem = {...item, category_id, id: item_id};
				delete(expectedResultItem.container_id);
				expect(result).toEqual(expectedResultItem);
			});
		});
		describe('PUT', () => {
			it('should update an item', () => {
				const category_id = 0,
					item_id = 1,
					item = getDummyItem();

				const postResult = localStore.persistItems(resolve, reject, 'post', [], {...item});
				const updatedItem = {
					...item,
					name: 'updatedItem',
					id: item_id,
					category_id: category_id
				}
				const result = localStore.persistItems(resolve, reject, 'put', [], updatedItem);
				const store = localStore.getStore();
				expect(store.containers[0].categories[0].items.length).toEqual(1);
				delete(updatedItem.container_id);
				delete(updatedItem.category);
				expect(store.containers[0].categories[0].items[0]).toEqual(updatedItem);
			});
		});
		describe('DELETE', () => {
			it('should delete an item by id', () => {
				const category_id = 0,
					item_id = 1,
					item = getDummyItem();

				const postResult = localStore.persistItems(resolve, reject, 'post', [], {...item});
				let store = localStore.getStore();
				expect(store.containers[0].categories[0].items.length).toEqual(1);
				const result = localStore.persistItems(resolve, reject, 'delete', [item_id]);
				store = localStore.getStore();
				expect(store.containers[0].categories[0].items.length).toEqual(0);

			});
		});				
	});
});