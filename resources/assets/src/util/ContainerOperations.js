import _ from 'lodash';

let fakeIndex = 0;

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

export const addContainerToContainers = (containers, container) => {
	let newContainers = [].concat(containers);
	newContainers.push(container);
	newContainers.sort(sortByNameKey);
	return newContainers;
};

const matchesFilterByName = (item, text) => item.name.toUpperCase().indexOf(text) > -1;

export const removeContainerFromContainers = (containers, container) => {
	let newContainers = [];
	for (let i = 0; i < containers.length; i++) {
		if (containers[i].id !== container.id) {
			newContainers.push(containers[i]);
		}
	}
	return newContainers;
};

export const updateContainerInContainers = (containers, container) => {
	let newContainers = containers.map(c => (c.id === container.id) ? container : c);
	newContainers.sort(sortByNameKey);
	return newContainers;	

}

export const updateCategoriesInContainers = (containers, container_id, categories) => {
	return {
		...containers,
		[container_id]: categories
	};
}

export const addItemToCategories = (categories, item) => {
	let newCategories = [].concat(categories);
	let added = false;
	//// add to existing category
	for (let i = 0; i < newCategories.length; i++) {
		let category = newCategories[i];
		if (category.name === item.category) {
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
		if (!removed && (category.name === item.category)) {
			const items = _.filter(category.items, catitem => catitem.id !== item.id);
			category = {
				...category,
				items
			};
			removed = true;
		}
		if (category.items.length > 0) {
			newCategories.push(category);
		}
	}	
	return newCategories;
};

export const updateItemInCategories = (categories, item) => {
	const newCategories = [];
	//// index of new category
	const newCategoryIndex = _.findIndex(categories, category => category.name === item.category);
	//// index of old category
	let oldCategoryIndex;
	for (let i = 0; i < categories.length; i++) {
		let category = categories[i];
		let index = _.findIndex(category.items, catitem => catitem.id === item.id);
		if (index > -1) {
			oldCategoryIndex = i;
			break;
		}
	}
	let container_id;
	//// build new categories array
	for (let i = 0; i < categories.length; i++) {
		let newItem;
		let category = categories[i];
		let newCategory = {...category};
		if (i === oldCategoryIndex) {
			let itemIndex = _.findIndex(category.items, catitem => catitem.id === item.id);
			container_id = category.container_id;
			//// category is same, update existing item
			if (oldCategoryIndex === newCategoryIndex) {
				newItem = {
					...item,
					category_id: category.id
				};
				newCategory.items[itemIndex] = newItem;

			//// category is different, remove old item
			} else {
				newCategory.items = _.filter(newCategory.items, catitem => catitem.id !== item.id);
			}
		//// category is different, add new item			
		} else if (i === newCategoryIndex) {
				newItem = {
					...item,
					category_id: category.id
				};
				newCategory.items.push(newItem);
				newCategory.items.sort(sortByNameKey);
		}
		//// add if category has items
		if (newCategory.items.length) {
			newCategories.push(newCategory);
		}

	}
	//// add new category
	if (newCategoryIndex === -1) {
		const category_id = fakeIndex++;
		const newItem = {
			...item,
			category_id,
		};
		const newCategory = {
			id: category_id,
			name: item.category,
			container_id,
			items: [newItem]
		};
		newCategories.push(newCategory);
		newCategories.sort(sortByNameKey);
	}
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