import client from './client'
import common from '@/util/common'
import uri from '@/util/uri'

export default {
  create: (values, token = null) => {
    return new Promise((resolve, reject) => {
      const params = uri.convToPostParams(values, ['name', 'body', 'type'])
      let options = {}
      if (token) options.headers = { Authorization: token }
      client.post('chats', params, options)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  },

  edit: (id, values, token = null) => {
    return new Promise((resolve, reject) => {
      if (common.isEmpty(values)) throw new Error('No value')
      const params = uri.convToPostParams(values, ['name', 'body'])
      let options = {}
      if (token) options.headers = { Authorization: token }
      client.post(`chats/${id}`, params, options)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  },

  get: (chatId = '', token = null) => {
    return new Promise((resolve, reject) => {
      let options = {}
      if (token) options.headers = { Authorization: token }
      client.get(`chats/${chatId}`, options)
        .then((res) => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  getByUserId: (userId, token = null, type = '') => {
    return new Promise((resolve, reject) => {
      let options = {}
      if (token) options.headers = { Authorization: token }
      client.get(`chats/users/${userId}/${type}`, options)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  },

  assignSupportChat: (userId, token = null) => {
    return new Promise((resolve, reject) => {
      let options = {}
      if (token) options.headers = { Authorization: token }
      client.post(`chats/users/${userId}/support`, {}, options)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  },

  getPublic: () => {
    return new Promise((resolve, reject) => {
      client.get('chats/public')
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  },
}
