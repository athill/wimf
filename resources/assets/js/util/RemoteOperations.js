import axios from 'axios';
import { SubmissionError } from 'redux-form';

import localPersistedStore from '../LocalPersistedStore';

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
    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }
    promise = axios({
      method,
      headers,
      url,
      data
    });
  }
  return promise;
};

export const getErrorFromAxiosResponse = response => {
  let error;
  if (response.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    error = response.response.data;
  } else if (response.request) {
    // The request was made but no response was received
    // `response.request` is an instance of XMLHttpRequest in the browser and an instance of
    error = response.request;
  } else {
    // Something happened in setting up the request that triggered an Error
    // console.log('Error', response.message);
    error = response;
  }
  return error;
};

export const defaultRejector = error => {
  console.log('rejecter', error);
  if (!error.message || !error.errors) {
    console.error('Unknown error in defaultRejector', error);
    return 'Unknown Error';
  }
  const response = {};
  if (error.message) {
    response._error = error.message;
  }
  if (error.errors) {
    for (let field in error.errors) {
      response[field] = error.errors[field];
    }
  }
  return response;
}

const chain = (promise, resolvers, rejecter = defaultRejector) => {
  return new Promise((resolve, reject) => {
      //// wrap resolve if not an array
      if (!Array.isArray(resolvers)) {
        resolvers = [resolvers];
      }
      //// chain resolves
      resolvers.forEach(resolver => promise.then(resolver));

      promise.then(response => resolve(response));
      //// chain catch
      promise.catch(response => {
        console.log('catch response', response);
        const error = getErrorFromAxiosResponse(response);
        console.log('before', error);      
        const rejection = rejecter(error);
        console.log('after', rejection);
        reject(rejection);
      });
  });
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

export const deleteRequest = (url, data, resolves, reject) => {
  //// data is not used, but makes the api consistent
  const promise = makePromise('delete', url);
  return chain(promise, resolves, reject);  
};
