export const addItemToContainer = (item, getState) => {

};

export const removeItemFromContainer = (item, getState) => {

};

const sortByNameKey = (x, y) => {
	if (x.name.toUpperCase() < y.name.toUpperCase()) return -1;
	else if (x.name.toUpperCase() > y.name.toUpperCase()) return 1;
	else return 0;
}


export const sortContainer = container => {
	const newContainer = Object.assign({}, container);
	console.debug(newContainer);
	newContainer.categories = newContainer.categories.filter(category => category.items.length > 0);
	newContainer.categories.sort(sortByNameKey);

	newContainer.categories.forEach(category => {
		category.items.sort(sortByNameKey);
	});
	return newContainer;
};

export const sortCategory = category => {

};



