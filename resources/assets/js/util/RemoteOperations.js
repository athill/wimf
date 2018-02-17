import axios from 'axios';

import localPersistedStore from '../LocalPersistedStore';

const localStoragePromise = (method, url, data) => {
  return new Promise(
    (resolve, reject) => {
      return localPersistedStore(resolve, reject, method, url, data);
    });
};

/**
 * 
 */
const makePromise = ({ url, data = {}, headers = {}, method = 'GET' })  => {
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
  if (!error.message && !error.errors && !error.error) {
    console.error('Unknown error in defaultRejector', error);
    return 'Unknown Error';
  }
  const response = {};
  if (error.message) {
    response._error = error.message;
  } else if (error.error) {
    response._error = error.error;
  }
  if (error.errors) {
    for (let field in error.errors) {
      response[field] = error.errors[field];
    }
  }
  return response;
};

const isJwtAuthUnauthenticated = error => error.message === 'Unauthenticated.';

class RemoteOperations {
  constructor(
    promiser, 
    errorTranslater, 
    rejecter,
    isRefresh
  ) {
    this.promiser = promiser || makePromise;
    this.errorTranslater = errorTranslater || getErrorFromAxiosResponse;
    this.rejecter = rejecter || defaultRejector;
    this.isRefresh = isRefresh || isJwtAuthUnauthenticated;

  }

  fetch = async ({ method, url, data = {}, resolvers = [], rejecter = this.rejecter, headers = {} }) => {
    const request = {
      data,
      headers,
      method,
      url
    };
    let response;
    try {
      response = await this.promiser(request);
    } catch (error) {
      error = this.errorTranslater(error);
      if (this.isRefresh(error)) {
        try {
            response = await this.promiser({ 
              method: 'POST', 
              url: '/api/refresh'
            });
            sessionStorage.setItem('token', response.data.access_token);
            response = await this.promiser(request);
        } catch (error) {
          const rejection = rejecter(error);
          throw rejection;
        }
      } else {
        const rejection = rejecter(error);
        throw rejection;
      }
    }
    //// wrap resolvers if not an array
    if (!Array.isArray(resolvers)) {
      resolvers = [resolvers];
    }

    //// iterate through resolvers
    for (let i = 0; i < resolvers.length; i++) {
      try {
        response = await resolvers[i](response);  
      } catch (error) {
        console.log(`problem with resolver ${i}`, response, error);
        const rejection = rejecter(error);
        throw rejection;
      }
    }
  } 

  get = (url, resolvers, rejecter) => {
    return this.fetch({ method: 'GET', url, resolvers, rejecter });
  } 

  post = (url, data, resolvers, rejecter) => {
    return this.fetch({ method: 'POST', url, data, resolvers, rejecter });
  } 

  put = (url, data, resolvers, rejecter) => {
    return this.fetch({ method: 'PUT', url, data, resolvers, rejecter });
  } 

  delete = (url, resolvers, rejecter) => {
    return this.fetch({ method: 'DELETE', url, resolvers, rejecter });
  }      
}


//// remote operations instance
const remoteOperation = new RemoteOperations();

//// helper methods
export const get = async (url, resolvers, rejecter) => {
    return await remoteOperation.get(url, resolvers, rejecter);
};

export const post = async (url, data, resolves, reject)  => {
  return await remoteOperation.post(url, data, resolves, reject);
};

export const put = async (url, data, resolves, reject)  => {
  return await remoteOperation.put(url, data, resolves, reject);
};

//// data is not used, but makes the api consistent
export const deleteRequest = async (url, data, resolves, reject) => {
  return await remoteOperation.delete(url, resolves, reject);
};
