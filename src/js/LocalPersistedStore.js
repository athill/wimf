import _ from 'lodash';


//// store
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
		email: 'demo@demo.com',
		container_id: 99999999
	}	
});

let store = getStorePristine();

let storeBackup = getStorePristine();

//// uncommenting the following line will give you a pristine store on every load for debugging
// localStorage.removeItem('wimf');

export const resetStore = () => {
	// const storePristine = getStorePristine();
	store = getStorePristine();
}

export const getStore = () => ({...store});


////// Helpers
const getReturnItem = (item, category) => {
	const returnItem = {...item};
	returnItem.category = category.name;
	return returnItem;
};

export const getContainerById = (id) => {
	const container = store.containers.find(container => (
		parseInt(container.id, 10) === parseInt(id, 10)
	));	
	if (container === undefined) {
		throw new Error(`container_id ${id} not found`);
	}
	store.user.container_id = id;
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

//// persistence methods
export const persistContainers = (resolve, reject, method, args=[], data={}) => {
	switch (method) {
		case 'get':
			//// container list for dropdown
			if (args.length === 0) {
				return {
					containers: store.containers.map(container => ({ 
						id: container.id,  
						name: container.name,
						description: container.description })),
					selected: store.user.container_id
				};
			//// specific container with categories
			} else {
				const container_id = args[0];
				const container = store.containers.find(container => (
						parseInt(container.id, 10) === parseInt(container_id, 10)
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
				store.user.container_id = container_id;
				return returnContainer;
			}
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
			// console.log(store);
			return container;
		case 'put':
			//// check for other container with new name
			let put_container = _.find(store.containers, { name: data.name });
			if (put_container && put_container.id !== data.id) {
				reject({ data: { update: `Add: Container "${put_container.name}" exists`}});
				return;
			}
			//// name changed
			if (!put_container) {
				put_container = _.find(store.containers, { id: data.id });
			}
			//// update container
			put_container = { ...put_container, ...data };
			//// update store
			store.containers = store.containers.map(container => {
				return (container.id === put_container.id) ? put_container : container;
			});
			return put_container;
		case 'delete':
			const id = args[0];
			store.containers = store.containers.filter(c => parseInt(c.id) !== parseInt(id));
			// console.log(store);
			return;
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
					if (_.find(category.items, catitem => parseInt(catitem.id, 10) === parseInt(id, 10))) {
						category.items = _.filter(category.items, catitem => parseInt(catitem.id, 10) !== parseInt(id, 10));
						break;						
					}
				}
			}
			return item;
		default:
			console.error('bad method');
	}
};

const localPersistedStore = (resolve, reject, method, url, data) => {
	const parts = url.slice(1).split('/').slice(1),
		type = parts[0],
		args = parts.slice(1);
	//// deserialize store
	if (localStorage.getItem('wimf')) {
		store = JSON.parse(localStorage.getItem('wimf')); 
	} else {
		localStorage.setItem('wimf', JSON.stringify(store));
	}
	//// update store
	let retval = {};
	method = method.toLowerCase();
	
	switch (type) {
		case 'containers':
			retval = persistContainers(resolve, reject, method, args, data);
			break;
		case 'items':
			retval = persistItems(resolve, reject, method, args, data);
			break;
		case 'me':
			retval = persistCurrentUser(resolve, reject, method, args, data);
			break;
		default:
			console.error('Invalid type', parts);
	}
	////serializeStore
	console.log('deserializeStore', resolve, reject, method, type, store);
	localStorage.setItem('wimf', JSON.stringify(store));
	storeBackup = { ...store };
	resolve({
		data: retval
	});
};

export default localPersistedStore;