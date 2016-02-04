import axios from 'axios';

export const fetch = (url, resolves, reject) => {
    chain(axios.get(url), resolves, reject);
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