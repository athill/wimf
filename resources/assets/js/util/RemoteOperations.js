import axios from 'axios';
import { SubmissionError } from 'redux-form';

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
  if (!error.message && !error.errors) {
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
};

const isJwtAuthUnauthenticated = error => error.message === 'Unauthenticated.';

// const defaultRefresher = (err) => {
//   if (!('response' in err && 'data' in err.response)) {
//     return;
//   }
//   const data = err.response.data;
//   if (data.message && data.message === 'Unauthenticated.') {
//     console.log('I\'m Unauthenticated');
//     chain(makePromise('POST', '/api/refresh'), 
//       response => {
//         console.log('new token', response.data.access_token);
//         sessionStorage.setItem('token', response.data.access_token);
//         console.log(promise);
//         // resolve(chain(promise, resolvers, rejecter));
//       });
//   }  
// }

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

  fetch = async (method, url, { data = {}, resolvers = [], rejecter = this.rejecter, headers = {} }) => {
    const request = {
      data,
      headers,
      method,
      url
    }
    let response;
    try {
      response = await this.promiser(request);
    } catch (error) {
      error = this.errorTranslater(error);
      if (this.isRefresh()) {
        try {
            response = await this.promiser({ 
              method: 'POST', 
              url: '/api/refresh'
            });
            sessionStorage.setItem('token', response.data.access_token);
            const newResponse = await this.promiser(request);
            return newResponse;
        } catch (error) {
          console.log('refresh catch', error);
        }
      } else {
        console.log('rejecting');
        const rejection = rejecter(error);
        throw new Exception(rejection);
      }
    }
    //// wrap resolve if not an array
    if (!Array.isArray(resolvers)) {
      resolvers = [resolvers];
    }

    for (var i = 0; i < resolvers.length; i++) {
      try {
        response = await resolvers[i](response);  
      } catch (error) {
        console.log(`problem with resolver ${i}`, response, error);
      }
    }

        // //// chain resolves
        // resolvers.forEach(resolver => promise.then(resolver));
        // //// resolve final response
        // // promise.then(response => resolve(response));
        // //// chain catch
        // promise.catch(async response => {
        //   const error = getErrorFromAxiosResponse(response);
        //   console.log('in catch', error, this.isRefresh(error));
        //   if (this.isRefresh(error)) {
        //     console.log('in isRefresh');
        //     try {
        //       const response = await this.promiser({ 
        //         method: 'POST', 
        //         url: '/api/refresh'
        //       });
        //       console.log('in refresh response');
        //       sessionStorage.setItem('token', response.data.access_token);
        //       try {
        //         const newResponse = await this.promiser({
        //             method,
        //             headers,
        //             url,
        //             data
        //         });
        //          return newResponse;
        //       } catch (error) {
        //         console.log('refresh catch', error)
        //         //// handle { message: 'Token has expired and can no longer be refreshed' }
        //       } 
        //     } catch (error) {
        //         console.log('refresh catch', error);
        //     } 
        //   } else {
        //       console.log('rejecting');
        //       const rejection = rejecter(error);
        //       throw new Exception(rejection);           
        //   }
        // });
    // })
    // .catch(error => console.log('outer promise', error));
  } 

  get = (url, resolvers, rejecter) => {
    return this.fetch('GET', url, { resolvers, rejecter })
      // .catch(error => console.log('get error', error));
  } 

  post = (url, data, resolvers, rejecter) => {
    return this.fetch('POST', url, { data, resolvers, rejecter });
  }   
}





// function chain(promise, resolvers, rejecter = defaultRejector) {
//   return new Promise((resolve, reject) => {
//       //// wrap resolve if not an array
//       if (!Array.isArray(resolvers)) {
//         resolvers = [resolvers];
//       }
//       promise.then(response => {
//         // if (response.headers && response.headers.authorization) {
//         //   console.log('setting Authorization', response.headers.authorization)
//         //   sessionStorage.setItem('token', response.headers.authorization);
//         // }
//         return response;
//       });
//       //// chain resolves
//       resolvers.forEach(resolver => promise.then(resolver));
//       //// resolve final response
//       promise.then(response => resolve(response));
//       //// chain catch
//       promise.catch(err => {
//         const data = err.response.data;
//         if (data.message && data.message === 'Unauthenticated.') {
//           console.log('I\'m Unauthenticated');
//           chain(makePromise('POST', '/api/refresh'), 
//             response => {
//               console.log('new token', response.data.access_token);
//               sessionStorage.setItem('token', response.data.access_token);
//               console.log(promise);
//               // resolve(chain(promise, resolvers, rejecter));
//             });
//         }        
//         const error = getErrorFromAxiosResponse(data);
//         const rejection = rejecter(error);
//         reject(rejection);
//       });
//   });
// };

const remoteOperation = new RemoteOperations();

export const get = async (url, resolvers, rejecter) => {
    // const promise = makePromise('get', url);
    // return chain(promise, resolves, reject);
    return await remoteOperation.get(url, resolvers, rejecter);
};

export const post = async (url, data, resolves, reject)  => {
  // const promise = makePromise('post', url, data);
  // return chain(promise, resolves, reject);
  return await remoteOperation.post(url, data, resolves, reject);
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
