import axios from 'axios';

export const fetch = (url, resolves, reject) => {
    // const promise = axios({
    //   method: 'get',
    //   url
    // });
    const promise = makePromise('get', url);

    chain(promise, resolves, reject);
};


const makePromise = (method, url, data)  => {
  if (location.pathname.includes('/api/demo')) {
    return localStoragePromise(method, url, data);
  } else {
    return axios({
      method,
      url,
      data
    });
  }
};


export const post = (url, data, resolves, reject)  => {
  const promise = axios({
    method: 'post',
    url,
    data
  });
  chain(promise, resolves, reject);
};


const chain = (promise, resolves, reject = response => console.error(response)) => {
    //// wrap resolve if not an array
    if (!(resolves.constructor === Array)) {
      resolves = [resolves];
    }
    //// chain resolves
    resolves.forEach(resolve => promise.then(resolve));
    //// chain catch
    promise.catch(reject);  
};


const localStoragePromise = (method, url, data) => {
  return new Promise(
    (resolve, reject) => {
      console.log('local storage promise');
    }
  );
};