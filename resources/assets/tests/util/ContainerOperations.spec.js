import expect from 'expect';
import _ from 'lodash';

import  * as ops from '../../util/ContainerOperations';

describe('ContainerOperations', () => {
	let categories, mocker;

	beforeEach(function() {
		mocker = new Mocker();
		categories = [
			mocker.category('yyc', ['e', 'd', 'a']),
			mocker.category('xxx', ['b', 'c', 'a'])
		];	
	});	
	describe('addItemToCategories', () => {
		it('should add item to existing category', () => {
			const category = categories[0];
			const item = {
				name: 'f',
				category: category.name,
				category_id: category.id
			};
			expect(category.items.length).toBe(3);
			const result = ops.addItemToCategories(categories, item);
			expect(result[0].items.length).toBe(4);
		});
		it('should add item to new category', () => {
			const category = mocker.category('cat3', []);
			const item = {
				name: 'f',
				category: category.name,
				category_id: category.id
			};
			const result = ops.addItemToCategories(categories, item);
			expect(result.length).toBe(3);
		});		
	});

	describe('updateItemInCategories', () => {
		it('should update an item with the same category', () => {
			const tmp = categories[0].items[0];
			const item = {
				...tmp,
				name: 'changed'
			};
			const result = ops.updateItemInCategories(categories, item);
			expect(result[0].items[0]).toEqual(item);
		});

		it('should update an item with the a different category', () => {
			const tmp = categories[0].items[0];
			const item = {
				...tmp,
				category: 'xxx'
			};
			item.category = 'xxx';
			const result = ops.updateItemInCategories(categories, item);
			expect(result[1].items[3]).toEqual({
				...item,
				category_id: categories[1].id
			});
		});		
	});

	describe('removeItemFromCategories', () => {
		it('should remove an item from a category', () => {
			const category = categories[0];
			const item = category.items[0];
			const result = ops.removeItemFromCategories(categories, item);
			expect(result[0].items.length).toBe(2);			
		});
	});

	describe('sortCategories', () => {
		it('should sort categories and items', () => {
			const expectedResult = [categories[1], categories[0]];
			expectedResult[0].items = [
				categories[1].items[2],
				categories[1].items[1],
				categories[1].items[0],
			];
			expectedResult[1].items = [
				categories[0].items[2],
				categories[0].items[1],
				categories[0].items[0],
			];			
			const result = ops.sortCategories(categories);
			expect(result).toEqual(expectedResult);
		});
	});

	describe('filterCategories', () => {
		it('should return everything on empty string', () => {
			const text = '';
			const result = ops.filterCategories(categories, text);
			expect(result).toEqual(categories);

		});
		it('should match on category', () => {
			const text = 'x';
			const expectedResult = [categories[1]];
			const result = ops.filterCategories(categories, text);
			expect(result).toEqual(expectedResult);

		});
		it('should match on item', () => {
			const text = 'a';
			const expectedResult = [].concat(categories);
			expectedResult[0].items = [categories[0].items[2]];
			expectedResult[1].items = [categories[1].items[2]];
			const result = ops.filterCategories(categories, text);
			expect(result).toEqual(expectedResult);
		});
		it('should match on item and category', () => {
			const text = 'c';
			const expectedResult = [].concat(categories);
			expectedResult[1].items = [categories[1].items[1]];
			const result = ops.filterCategories(categories, text);
			expect(result).toEqual(expectedResult);
		});		
	});
});

class Mocker {
	constructor() {
		this.id = 0;	
	}
	

	category(name, items) {
		const catid = this.id++;
		return {
			name,
			id: catid,
			items: items.map(item => this.item(item, name, catid)),
			container_id: 9999999
		};
	}
	item(name, category_name, category_id) {
		return {
			name,
			category: category_name,
			category_id,
			id: this.id++,
			quantity: 1,
			measurement: 'lb'
		}
	}
}
