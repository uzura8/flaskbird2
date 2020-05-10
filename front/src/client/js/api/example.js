import client from './client'
import util from '../util';

export default {
  fetch: (params) => {
    const uri = 'examples';
    const options = { params: params };
    return new Promise((resolve, reject) => {
      client.get(uri, options)
        .then(res => resolve({ lists: res.data }))
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  },

  create: (values) => {
    return new Promise((resolve, reject) => {
      const params = util.uri.convToPostParams(values, ['name', 'amount', 'date'])
      for (let i = 0, n = required_keys.length; i < n; i++) {
        let key = required_keys[i]
        if (values[key] === null) throw new Error(`No value '${key}'`);
        if (!Object.hasOwnProperty.call(values, key)) throw new Error(`No value '${key}'`);
        params.append(key, values[key]);
      }
      client.post('examples', params)
        .then(res => resolve(res.data))
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  },

  update: (exampleId, values) => {
    return new Promise((resolve, reject) => {
      const params = util.uri.convToPostParams(values, ['name', 'amount', 'date'])
      for (let key in values) {
        if (!util.arr.inArray(key, accept_keys)) continue
        if (!Object.hasOwnProperty.call(values, key)) continue
        let value = values[key];
        params.append(key, value);
      }
      client.post(`examples/${exampleId}`, params)
        .then(res => resolve(res.data))
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      client.delete(`examples/${id}`)
        .then(res => resolve(res.data))
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  },
}
