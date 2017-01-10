import faker from 'faker';

export default class Mocker {
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
			quantity: 'just enough'
		}
	}

	categories(numCategories, numItems) {
		// mocker.category('yyc', ['e', 'd', 'a']),
		const categories = [];
		 Array(numCategories).fill().forEach((_, i) => {
		 	const categoryName = faker.lorem.word();
			const items = Array(numItems).fill.forEach(() => faker.lorem.word());
			categories.push(category(categoryName, items)); 
		});
		 return categories;
	}
}