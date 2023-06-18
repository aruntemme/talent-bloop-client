import {
  post, get, put, del,
} from './base';

class ApiClient {
    login = (email, password) => post('/admin/login', false, { email, password })

    createEvent = (data) => post('/admin/events', true, data)

    getTalents = () => get('/talents', false)

    search = (query) => get(`/search?query=${query}`, false)
}

export default new ApiClient();
