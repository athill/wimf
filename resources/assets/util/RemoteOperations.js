import axios from 'axios';

import localPersistedStore from '../store/LocalPersistedStore';

export const fetch = (url, resolves, reject) => {
    const promise = makePromise('get', url);
    chain(promise, resolves, reject);
};

export const post = (url, data, resolves, reject)  => {
  const promise = makePromise('post', url, data);
  chain(promise, resolves, reject);
};

export const put = (url, data, resolves, reject)  => {
  const promise = makePromise('put', url, data);
  chain(promise, resolves, reject);
};

export const deleteRequest = (url, resolves, reject) => {
  const promise = makePromise('delete', url);
  chain(promise, resolves, reject);  
};


const makePromise = (method, url, data)  => {
  let promise = null;
  if (location.pathname.includes('/demo')) {
    promise = localStoragePromise(method, url, data);
  } else {
    promise = axios({
      method,
      url,
      data
    });
  }
  return promise;
};

const chain = (promise, resolves, reject = response => {console.error(response); reject(); }) => {
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
      localPersistedStore(resolve, reject, method, url, data);
    });
};