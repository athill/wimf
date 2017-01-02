import faker from 'faker';

export const getFakeContainers = count => {
  	return {
	  	items: Array(count).fill().map(() => ({
	  		id: faker.lorem.word(),
	  		name: faker.lorem.words()
	  	}))
  	};
};




export const getFakeCategories = (catCount, itemCount) => {
  return Array(catCount).fill().map(() => {
    return {
      name: faker.lorem.words(),
      items: Array(itemCount).fill().map(() => {
        return {
          name: faker.lorem.words(),
          quantity: faker.random.number(),
          date: faker.date.past()
        };
      })
    };
  });
};

export const getFakeContainer = categories => {
  	return {
  		name: faker.lorem.word(),
  		categories
  	};
};

  