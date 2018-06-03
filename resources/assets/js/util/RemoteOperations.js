import axios from 'axios';

import history from '../history';
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
const makePromise = ({ url, config = {}, method = 'GET' })  => {
  let promise = null;
  if (location.pathname.includes('/demo')) {
    promise = localStoragePromise(method, url, data);
  } else {
    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    };
    config.headers = config.headers ? Object.assign({}, config.headers, headers) : headers;
    const params = {
      ...config,
      method,
      url,
    };
    promise = axios(params);
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
  if (error.response && error.response.data && error.response.data.message) {
    response._error = error.response.data.message;
  } else if (error.message) {
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

  fetch = async ({ method, url, config={}, resolvers = [], rejecter = this.rejecter }) => {
    //// this might be a bad idea. requires adding `data: {}` if you want to pass headers without data, etc. seems like an edge case, but still
    if (!('data' in config)) {
      config = { data: config };
    }
    const request = {
      config,
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
        } catch (error) {
          if (error.response.data.message === 'Token has expired') {
            sessionStorage.removeItem('token');
            localStorage.removeItem('token');
            history.push('/login');

          } else {
            const rejection = rejecter(error);
            throw rejection;                      
          }
        }
        try {
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

  post = (url, config, resolvers, rejecter) => {
    if (!'data' in config) {
      config = { data: config };
    }
    return this.fetch({ method: 'POST', url, config, resolvers, rejecter });
  } 

  put = (url, config, resolvers, rejecter) => {
    return this.fetch({ method: 'PUT', url, config, resolvers, rejecter });
  } 

  delete = (url, resolvers, rejecter) => {
    return this.fetch({ method: 'DELETE', url, resolvers, rejecter });
  }      
}


export const download = ({ content, filename, charset='utf-8', mimeType='application/json' }) => {
  let blob = new Blob([JSON.stringify(content)], { type: `${mimeType};charset=${charset};` });
  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) { // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }          
};  

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
