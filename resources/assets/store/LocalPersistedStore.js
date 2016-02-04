
const store = {
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

localStorage.removeItem('wimf');

const localPersistedStore = (method, url, data) => {
	const parts = url.slice(1).split('/').slice(1),
		type = parts[0],
		args = parts.slice(1);
	//// deserialize store
	if (localStorage.getItem('wimf')) {
		store = JSON.parse(localStorage.getItem('wimf')); 
	}		
	//// update store
	let retval = {};
	switch (type) {
		case 'containers':
			retval = persistContainers(method, args, data);
			break;
		case 'items':
			retval = persistItems(method, args, data);
			break;
		case 'currentUser':
			retval = persistCurrentUser(method, args, data);
			break;
		default:
			console.error('Invalid type', parts);
	}
	////serializeStore
	console.log('serializeStore', store);
	localStorage.setItem('wimf', JSON.stringify(store));
	console.log('retval', retval);
	return retval;
};



const persistContainers = (method, args, data) => {
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
				const container_id = args[0],
					container = store.containers.find(container => (
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

const persistCurrentUser = (method, args, data) => {
	switch (method) {
		case 'get':
			return store.user;
		default:
			console.error('bad method');
	}
};

const persistItems = (method, args, data) => {
	switch (method) {
		case 'post':
			const { container_id, container: category_name, ...item } = data;
			const container = store.containers.find(container => (
				parseInt(container.id) === parseInt(container_id)
			));
			if (container === undefined) {
				throw new Error(`container_id ${container_id} not found`);
			}
			let category = container.find(category => (category.name === category_name);
			if (category === undefined) {
				category = {
					id: store.maxid++,
					name: data.category,
					container_id,
					items: [item]
				};
				store.containers.categories.push(category)
			} else {
				category = categories[0];
				category.items.push(item);
				for (let i = 0; i < store.containers.categories.length; i++) {
					if (store.containers.categories[i].id === category.id) {
						store.containers.categories[i].items.push(item);
					}
				}
			}
			return item;
		default:
			console.error('bad method');
	}
};


export default localPersistedStore;