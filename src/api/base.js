/* eslint-disable no-param-reassign */
import axios from 'axios';

class PawgaError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const base = 'http://127.0.0.1:5656';

const handleError = (promise) => promise.catch((error) => {
  if (!error.response) {
    throw error;
    // TODO show network connectivity
  }
  if (error.response.status === 401) {
    // clear local storage
    localStorage.clear();
    // redirect to login page
    window.location.href = '/';
  }
  throw new PawgaError(error.response.data, error.response.status);
});

const get = (
  path,
  auth = true,
  headers = {},
) => {
  // get auth token from local storage and set it to the url
  if (auth) {
    const token = localStorage.getItem('authtoken');
    path = `${path}?authtoken=${token}`;
  }
  return handleError(
    axios({
      method: 'GET',
      url: base + path,
      // timeout: 6000,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    }).then(({ data }) => data),
  );
};

const post = (
  path,
  auth = true,
  body,
  headers = {},
) => {
  if (auth) {
    const token = localStorage.getItem('authtoken');
    body = Object.assign(body, { authtoken: token });
  }
  return handleError(
    axios({
      method: 'POST',
      url: base + path,
      headers: {
        'Content-Type': 'application/json',
        withCredentials: true,
        ...headers,
      },
      data: JSON.stringify(body),
    }).then(({ data }) => data),
  );
};

const put = (
  path,
  auth = true,
  body = {},
  headers = {},
) => {
  if (auth) {
    const token = localStorage.getItem('authtoken');
    body = Object.assign(body, { authtoken: token });
  }
  return handleError(
    axios({
      method: 'PUT',
      url: base + path,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      data: JSON.stringify(body),
    }).then(({ data }) => data),
  );
};

const del = (
  path,
  auth = true,
  headers = {},
) => {
  if (auth) {
    const token = localStorage.getItem('authtoken');
    path = `${path}?authtoken=${token}`;
  }
  return handleError(
    axios({
      method: 'DELETE',
      url: base + path,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    }).then(({ data }) => data),
  );
};

export {
  get, post, put, del,
};
