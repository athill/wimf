import _ from 'lodash';

export const getStorePristine = () => ({
	maxid: 0,
	containers: [{
		id: 99999999,
		name: 'Freezer',
		description: '',
		categories: []
	}],
	user: {
		id: 88888888,
		name: 'demo',
		email: 'demo@demo.com'
	}	
});

let store = getStorePristine();

let storeBackup = getStorePristine();

// localStorage.removeItem('wimf');

const setStore = (newStore) => store = {...newStore};

export const resetStore = () => {
	const storePristine = getStorePristine();
	store = getStorePristine();
}

export const getStore = () => ({...store});

export const localPersistedStore = (resolve, reject, method, url, data) => {
	const parts = url.slice(1).split('/').slice(1),
		type = parts[0],
		args = parts.slice(1);
	//// deserialize store
	if (localStorage.getItem('wimf')) {
		store = JSON.parse(localStorage.getItem('wimf')); 
	}		
	//// update store
	let retval = {};
	console.log('deserializeStore', resolve, reject, method, type, store);
	switch (type) {
		case 'containers':
			retval = persistContainers(resolve, reject, method, args, data);
			break;
		case 'items':
			retval = persistItems(resolve, reject, method, args, data);
			break;
		case 'currentUser':
			retval = persistCurrentUser(resolve, reject, method, args, data);
			break;
		default:
			console.error('Invalid type', parts);
	}
	////serializeStore
	localStorage.setItem('wimf', JSON.stringify(store));
	storeBackup = { ...store };
	resolve({
		data: retval
	});
};



export const persistContainers = (resolve, reject, method, args=[], data={}) => {
	switch (method) {
		case 'get':
			//// container list for dropdown
			if (args.length === 0) {
				return store.containers.map(container => ({ 
						id: container.id,  
						name: container.name,
						description: container.description
				}));
			//// specific container with categories
			} else {
				const container_id = args[0];
				const container = store.containers.find(container => (
						parseInt(container.id) === parseInt(container_id)
					));
				if (container === undefined) {
					throw new Error(`Undefined container, ${args[0]}`);
				}
				const returnContainer = Object.assign({}, container);
				returnContainer.categories.forEach(category => {
					category.items.forEach(item => {
						item.category = category.name;
					});
				});
				return returnContainer;
			}
			break;
		case 'post':
			const container = {
				name: data.name,
				description: data.description,
				id: store.maxid++,
				categories: []
			};
			//// check for duplicates
			if (_.find(store.containers, { name: container.name })) {
				reject({ data: { error: `Add: Container "${container.name}" exists`}});
				return;
			}				
			store.containers.push(container);
			return container;
			break;
		default:
			console.error('bad method');
	}
};

export const persistCurrentUser = (resolve, reject, method, args, data) => {
	switch (method) {
		case 'get':
			return store.user;
		default:
			console.error('bad method');
			reject();
	}
};




export const persistItems = (resolve, reject, method, args, data) => {
	let category_name, item, container, category, container_id;
	//// put/post
	if (['put', 'post'].indexOf(method) > -1) {
		({ container_id, category: category_name, ...item } = data);
		//// find the container
		container = getContainerById(container_id);

		//// find the category
		category = getCategoryByName(container, category_name);
		//// set item's category id
		item.category_id = category.id;	
	}
	//// update item state	
	switch (method) {
		case 'post':
			//// add id to item
			item.id = store.maxid++;
			//// check for duplicates
			if (_.find(category.items, { name: item.name })) {
				store = {...storeBackup};
				reject({ data: { error: `Add: Item "${item.name}" exists in "${category.name}"`}});
				return;
			}				
			category.items.push(item);
			return getReturnItem(item, category);
		case 'put':
			const existingItem = _.find(category.items, { id: item.id });
			//// check for duplicates
			if (_.find(category.items, item => item.id !== existingItem.id 
					&& item.name === existingItem.name)) {
				store = {...storeBackup};
				reject({ data: { error: `Update: Item "${item.name}" exists in "${category.name}"`}});
				return;
			}	
			for (let i = 0; i < category.items.length; i++) {
				if (category.items[i].id === item.id) {
					category.items[i] = item;
				}
			}			
			return getReturnItem(item, category);
		case 'delete':
			const id = args[0];
			for (let i = 0; i < store.containers.length; i++) {
				let categories = store.containers[i].categories;
				for (let j = 0; j < categories.length; j++) {
					let category = categories[j];
					if (_.find(category.items, catitem => parseInt(catitem.id) === parseInt(id))) {
						category.items = _.filter(category.items, catitem => parseInt(catitem.id) !== parseInt(id));
						break;						
					}
				}
			}
			return item;
		default:
			console.error('bad method');
	}
};

////// Helpers

const getReturnItem = (item, category) => {
	const returnItem = {...item};
	returnItem.category = category.name;
	return returnItem;
};

export const getContainerById = (id) => {
	const container = store.containers.find(container => (
		parseInt(container.id) === parseInt(id)
	));	
	if (container === undefined) {
		throw new Error(`container_id ${id} not found`);
	}
	return container;	
}

export const getCategoryByName = (container, name) => {
	let category = _.find(container.categories, { name: name });	
	if (category === undefined) {
		category = {
			id: store.maxid++,
			name: name,
			container_id: container.id,
			items: []
		};
		container.categories.push(category);
	}
	return category;
};

export default localPersistedStore;