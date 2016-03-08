import _ from 'lodash';

export const addItemToCategories = (categories, item) => {
	let newCategories = [].concat(categories);
	let added = false;
	//// add to existing category
	for (let i = 0; i < newCategories.length; i++) {
		let category = newCategories[i];
		if (category.id === item.category_id) {
			category.items.push(item);
			category.items.sort(sortByNameKey);
			added = true;
			break;
		}
	}
	//// add to new category
	if (!added) {
		newCategories.push({
			name: item.category,
			id: item.category_id,
			items: [item]
		});
		newCategories = sortCategories(newCategories);
	}
	return newCategories;
};

export const removeItemFromCategories = (categories, item) => {
	let newCategories = [];
	let removed = false;
	//// remove from existing category
	for (let i = 0; i < categories.length; i++) {
		let category = categories[i];
		console.debug('removeItemFromCategories cat compare', category.id, 
			item.category_id, category.id === item.category_id, item)
		if (!removed && (category.name === item.category)) {
			const items = _.remove(category.items, catitem => catitem.id === item.id);
			console.debug('removeItemFromCategories before', category, item);
			category = {
				...category,
				items
			};
			console.debug('removeItemFromCategories after', category, item);
			removed = true;
		}
		if (category.items.length > 0) {
			newCategories.push(category);
		}
	}	
	return newCategories;
};

const sortByNameKey = (x, y) => {
	if (x.name.toUpperCase() < y.name.toUpperCase()) return -1;
	else if (x.name.toUpperCase() > y.name.toUpperCase()) return 1;
	else return 0;
}


export const sortCategories = categories => {
	const newCategories = categories.filter(category => category.items.length > 0);
	newCategories.sort(sortByNameKey);
	newCategories.forEach(category => {
		category.items.sort(sortByNameKey);
	});
	return newCategories;
};

export const filterCategories = (categories, text) => {
	if (!text) {
		return categories;
	}
	text = text.toUpperCase();
	
	const newCategories = [];
	categories.forEach(category => {
		if (matchesFilterByName(category, text)) {			
			newCategories.push(category);
		} else {
			const filteredItems = category.items.filter(item => matchesFilterByName(item, text));
			if (filteredItems.length > 0) {
				const newCategory = {
					...category,
					items: filteredItems
				};
				newCategories.push(newCategory);
			}
		}
	});
	return newCategories;
};

const matchesFilterByName = (item, text) => item.name.toUpperCase().indexOf(text) > -1;

export const sortCategory = category => {

};