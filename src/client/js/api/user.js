import client from './client'
import uri from '@/util/uri'

export default {
  create: (values) => {
    return new Promise((resolve, reject) => {
      const params = uri.convToPostParams(values, ['name', 'email', 'password'])
      client.post('users', params)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  },

  createServiceUser: (serviceCode, serviceUserId, vals) => {
    let postVals = Object.assign({}, vals);
    postVals.uid = serviceUserId
    return new Promise((resolve, reject) => {
      const params = uri.convToPostParams(postVals, ['uid'])
      client.post(`users/services/${serviceCode}`, params)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  },

  get: (userId = '') => {
    return new Promise((resolve, reject) => {
      if (!userId) userId = 'me'
      client.get(`users/${userId}`)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  },

  authenticate: (values) => {
    return new Promise((resolve, reject) => {
      const params = uri.convToPostParams(values, ['email', 'password'])
      client.post('users/signin', params)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  },

  check: () => {
    return new Promise((resolve, reject) => {
      client.get('users/check')
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  },

  signOut: () => {
    return new Promise((resolve, reject) => {
      client.get('users/signout')
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  },
}
