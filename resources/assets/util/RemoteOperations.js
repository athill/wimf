import _ from 'lodash';
import Axios from 'axios';

import traverson from './traverson';

export const retrieveTopLevelContent = (linkToFollow, templateParameters) => () => new Promise((resolve, reject) => {
  traverson.from('/api/').jsonHal().newRequest()
    .withTemplateParameters(templateParameters)
    .follow(linkToFollow)
    .getResource(function (err, resource, traversal) {
      if (err) {
        reject(err);
      } else {
        handleIncomingData(resolve, reject, resource, linkToFollow, traversal.continue());
      }
    });
});

export const retrieveChildContent = (parent, contentType) => () => new Promise((resolve, reject) => {
  traverson.from(parent._links.children.href).jsonHal()
    .newRequest()
    .getResource(function (err, resource, traversal) {
      if (err) {
        reject(err);
      } else {
        handleIncomingData(resolve, reject, resource, contentType, traversal.continue());
      }
    })
});

export const postEntity = (entity, url, onSuccess, onError)  => getFormDataPromise(entity, url, 'post', onSuccess, onError);

export const putEntity = (entity, url, onSuccess, onError) => getFormDataPromise(entity, url, 'put', onSuccess, onError);

const getFormDataPromise = (entity, formUrl, method, onSuccess, onError) => () => (
  new Promise((resolve, reject) => {
    performRequestWithCsrf(formUrl, method, entity)()
      .then((system) => {
        onSuccess(system);
        resolve(system);
      })
      .catch((errorResponse) => {
        let errors = { };
        if (errorResponse.status >= 500) {
          errors._error = ['There was an unexpected server error. You may attempt to resubmit in a few minutes.'];
        } else {
          const [unboundErrors, fieldErrors] = _.partition(errorResponse.data.errors, 'property', '');
          fieldErrors.forEach(entry => {
            errors[entry.property] = entry.message;
          });
          errors._error = _.pluck(unboundErrors, 'message');
        }
        onError(errors);
        reject(errorResponse);
      });
  })
);

/**
 * Performs a CSRF request to get the CSRF Token and then performs a request with the given values
 * @param url the URL to use in the case of a successful CSRF request
 * @param method the request method to use
 * @param entity an object with a headers property and a data property to submit to the URL
 */
const performRequestWithCsrf = (url, method, entity) => () => new Promise((resolve, reject) => {
  Axios.get("/csrf")
    .then(response => {
      const requestHeaders = entity.headers;
      let headers = {
        ...requestHeaders,
        ['X-Requested-With']: 'XMLHttpRequest',
        [response.data.headerName]: response.data.token
      };
      Axios({
        method: method,
        headers: headers,
        url: url,
        data: entity.data
      })
        .then(response => {
          resolve(response);
        })
        .catch(response => {
          reject(response)
        });
    })
    .catch(response => {
      reject(response);
    });
});

const handleIncomingData = (resolve, reject, resource, contentType, request, accumulator = []) => {
  const content = [...accumulator, ...resource._embedded[contentType]];
  if (resource._links.next) {
    let nextPage = request.follow('next');
    nextPage.getResource(function(err, resource, traversal) {
      if (err) {
        reject(err);
      } else {
        handleIncomingData(resolve, reject, resource, contentType, traversal.continue(), content);
      }
    });
  } else {
    const createUrl = resource._links.create ? resource._links.create.href : undefined;
    resolve({
      content,
      createUrl
    });
  }
};
