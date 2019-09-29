import store from '@/store'
import client from './client'
import common from '@/util/common'
import uri from '@/util/uri'

export default {
  create: (values) => {
    return new Promise((resolve, reject) => {
      const params = uri.convToPostParams(values, ['name', 'body'])
      let options = {}
      if (store.state.auth.token) {
        options.headers = { Authorization: store.state.auth.token }
      }
      client.post('chats', params, options)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  },

  edit: (id, values) => {
    return new Promise((resolve, reject) => {
      if (common.isEmpty(values)) throw new Error('No value')
      const params = uri.convToPostParams(values, ['name', 'body'])
      client.post('chats/' + id, params)
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
