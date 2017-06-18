import axios from 'axios';

import localPersistedStore from '../store/LocalPersistedStore';

const localStoragePromise = (method, url, data) => {
  return new Promise(
    (resolve, reject) => {
      localPersistedStore(resolve, reject, method, url, data);
    });
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

const chain = (promise, resolvers, rejecter = response => {console.error(response); reject(); }) => {
    //// wrap resolve if not an array
    if (!Array.isArray(resolvers)) {
      resolvers = [resolvers];
    }
    //// chain resolves
    resolvers.forEach(resolve => promise.then(resolve));
    //// chain catch
    promise.catch(error => {
      let problem;
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        problem = error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        problem = error.request;
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.log('Error', error.message);
        problem = error;
      }      

      rejecter(problem);
    });

    return promise;  
};




export const get = (url, resolves, reject) => {
    const promise = makePromise('get', url);
    return chain(promise, resolves, reject);
};

export const post = (url, data, resolves, reject)  => {
  const promise = makePromise('post', url, data);
  return chain(promise, resolves, reject);
};

export const put = (url, data, resolves, reject)  => {
  const promise = makePromise('put', url, data);
  return chain(promise, resolves, reject);
};

export const deleteRequest = (url, resolves, reject) => {
  const promise = makePromise('delete', url);
  return chain(promise, resolves, reject);  
};


