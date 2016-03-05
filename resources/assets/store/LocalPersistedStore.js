import _ from 'lodash';

let store = {
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
};

let storeBackup = store;

localStorage.removeItem('wimf');

const localPersistedStore = (resolve, reject, method, url, data) => {
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
	storeBackup = Object.assign({}, store);
	resolve({
		data: retval
	});
};



const persistContainers = (resolve, reject, method, args, data) => {
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
		default:
			console.error('bad method');
	}
};

const persistCurrentUser = (resolve, reject, method, args, data) => {
	switch (method) {
		case 'get':
			return store.user;
		default:
			console.error('bad method');
	}
};




const persistItems = (resolve, reject, method, args, data) => {
	const { category: category_name, ...item } = data;
	//// find the container
	const container = getContainerByItem(item);
	//// find the category
	const category = getCategoryByName(container, category_name);
	//// check for duplicates
	if (_.find(category.items, { name: item.name })) {
		store = Object.assign({}, storeBackup);
		reject({ data: { error: `Item "${item.name}" exists in "${category.name}"`}});
	}	
	//// set item's category id
	item.category_id = category.id;	
	//// update item state	
	switch (method) {
		case 'post':
			//// add id to item
			item.id = store.maxid++;
			category.items.push(item);
			return item;				
		case 'put':
			for (let i = 0; i < category.items.length; i++) {
				if (category.items[i].id === item.id) {
					category.items[i] = item;
				}
			}			
			return item;
		default:
			console.error('bad method');
	}
};

////// Helpers

const getContainerByItem = (item) => {
	const container = store.containers.find(container => (
		parseInt(container.id) === parseInt(item.container_id)
	));	
	if (container === undefined) {
		throw new Error(`container_id ${item.container_id} not found`);
	}
	return container;	
}

const getCategoryByName = (container, name) => {
	let category = _.find(container.categories, { name: name });	
	if (category === undefined) {
		const category_id = store.maxid++;
		category = {
			id: category_id,
			name: name,
			container_id: container.id,
			items: []
		};

		container.categories.push(category);
	}
	return category;
};

export default localPersistedStore;