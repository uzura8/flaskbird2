import client from './client'
import util from '../util'

export default {
  create: (values) => {
    return new Promise((resolve, reject) => {
      const params = util.uri.convToPostParams(values, ['name', 'email', 'password'])
      client.post('users', params)
        .then(res => resolve(res.data))
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  },
}
