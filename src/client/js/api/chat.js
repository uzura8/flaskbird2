import client from './client'
import common from '@/util/common'
import uri from '@/util/uri'

export default {
  create: (values, token = null) => {
    return new Promise((resolve, reject) => {
      const params = uri.convToPostParams(values, ['name', 'body'])
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

  get: (userId='') => {
    return new Promise((resolve, reject) => {
      client.get(`chats/${userId}`)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  },
}
