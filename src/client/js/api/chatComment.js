import client from './client'
import uri from '@/util/uri'

export default {
  fetch: (chatId, params) => {
    const uri = `chats/${chatId}/comments`;
    const options = { params: params };
    return new Promise((resolve, reject) => {
      client.get(uri, options)
        .then(res => resolve({ lists: res.data }))
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  },

  create: (chatId, values, token = null) => {
    return new Promise((resolve, reject) => {
      const params = uri.convToPostParams(values, ['body'])
      const reqUri = `chats/${chatId}/comments`;
      let options = {}
      if (token) options.headers = { Authorization: token }
      client.post(reqUri, params, options)
        .then(res => resolve(res.data))
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  },

  delete: (chatComment) => {
    return new Promise((resolve, reject) => {
      const reqUri = `chats/${chatComment.chatId}/comments/${chatComment.id}`;
      client.delete(reqUri)
        .then(res => resolve(res.data))
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  },
}
