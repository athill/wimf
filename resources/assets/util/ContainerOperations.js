export const addItemToCategories = (item, categories) => {
	newCategories = [].concat(categories);
	let added = false;
	for (let i = 0; i < newCategories.length; i++) {
		let category = newCategories[i];
		if (category.id === item.container_id) {
			category.push(item);
			category.sort(sortByNameKey);
			added = true;
			break;
		}
	}
	if (!added) {

	}
	return newCategories;
};

export const removeItemFromCategories = (item, getState) => {

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
				}
				newCategories.push(newCategory);
			}
		}
	});
	return newCategories;
};

const matchesFilterByName = (item, text) => item.name.toUpperCase().indexOf(text) > -1;

export const sortCategory = category => {

};



