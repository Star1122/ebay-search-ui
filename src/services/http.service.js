import axios from 'axios';

import config from 'config';

const http = axios.create({ baseURL: `${config.apiUrl}/` });

function get(url, headers = {}, params = {}, query = {}) {
  const queryString = Object.keys(query).reduce((qStr, key) => {
    if (query[key] === undefined || query[key] === null) {
      return '';
    }
    if (qStr) {
      return `${qStr}&${key}=${query[key]}`;
    } return `?${key}=${query[key]}`;
  }, '');

  return http.get(`${url}${queryString}`, { headers, params })
    .then((response) => response.data)
    .catch((err) => Promise.reject(err.response.data));
}

function post(url, data, headers = {}, params = {}) {
  return http.post(url, data, { headers, params })
    .then((response) => response.data)
    .catch((err) => Promise.reject(err.response.data));
}

function put(url, data, headers = {}, params = {}) {
  return http.put(url, data, { headers, params })
    .then((response) => response.data)
    .catch((err) => Promise.reject(err.response.data));
}

function remove(url, headers = {}, params = {}) {
  return http.delete(url, { headers, params })
    .then((response) => response.data)
    .catch((err) => Promise.reject(err.response.data));
}

export default {
  http,
  get,
  post,
  put,
  remove,
};
