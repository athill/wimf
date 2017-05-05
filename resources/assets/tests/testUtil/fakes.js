import faker from 'faker';

export const getFakeContainers = count => {
    const containers = {};
  	Array(count).fill().forEach(() => {
        const container = getFakeContainer();
	  		containers[container.id] = container;
	  });
    return containers;
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
      id: faker.lorem.word(),
  		name: faker.lorem.word(),
  		categories: categories || []
  	};
};

  