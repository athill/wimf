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
				return container;
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
	switch (method) {
		case 'post':
			const { category: category_name, ...item } = data;
			//// add id to item
			item.id = store.maxid++;
			//// find the container
			// const 
			const container = store.containers.find(container => (
				parseInt(container.id) === parseInt(item.container_id)
			));
			if (container === undefined) {
				throw new Error(`container_id ${item.container_id} not found`);
			}
			//// find the category
			let category = _.find(container.categories, { name: category_name });
			//// new category
			if (category === undefined) {
				const category_id = store.maxid++;
				item.category_id = category_id;
				category = {
					id: category_id,
					name: data.category,
					container_id: item.container_id,
					items: [item]
				};

				container.categories.push(category);
			//// existing category
			} else {
				//// check for duplicates
				if (_.find(category.items, { name: item.name })) {
					store = Object.assign({}, storeBackup);
					reject({ data: { error: `Item "${item.name}" exists in "${category.name}"`}});
				}
				item.category_id = category.id;
				category.items.push(item);
			}
			return item;
		default:
			console.error('bad method');
	}
};

export default localPersistedStore;