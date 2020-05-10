import * as types from './mutation-types'
import { Example, User, Chat, ChatComment, Firebase } from '@/api'
import config from '@/config/config'
const isEnabledFB = config.firebase.isEnabled

export default {
  setHeaderMenuOpen: ({ commit }, isOpen) => {
    commit(types.SET_COMMON_HEADER_MENU_OPEN, isOpen)
  },

  setAuth: ({ commit }, user) => {
    commit(types.AUTH_SET_USER, user)
    commit(types.AUTH_UPDATE_STATE, true)
  },

  authenticate: async ({ commit }, payload) => {
    commit(types.SET_COMMON_LOADING, true)
    if (isEnabledFB) {
      try {
        const res = await Firebase.authenticate(payload)
        const idToken = await Firebase.getToken(res.user)
        const serviceUser = await User.getServiceUser('firebase', res.user.uid, idToken)
        const user = {
          id: serviceUser.id,
          uid: res.user.uid,
          name: res.user.displayName,
          type: serviceUser.type,
          email: res.user.email,
          serviceCode: 'firebase',
        }
        commit(types.AUTH_SET_USER, user)
        commit(types.AUTH_SET_TOKEN, idToken)
        commit(types.AUTH_UPDATE_STATE, true)
        commit(types.SET_COMMON_LOADING, false)
      } catch (error) {
        commit(types.AUTH_SET_USER, null)
        commit(types.AUTH_SET_TOKEN, null)
        commit(types.AUTH_UPDATE_STATE, false)
        commit(types.SET_COMMON_LOADING, false)
        throw error
      }
    } else {
      try {
        const user = User.authenticate(payload)
        commit(types.AUTH_SET_USER, user)
        commit(types.AUTH_UPDATE_STATE, true)
        commit(types.SET_COMMON_LOADING, false)
      } catch (error) {
        commit(types.AUTH_SET_USER, null)
        commit(types.AUTH_SET_TOKEN, null)
        commit(types.AUTH_UPDATE_STATE, false)
        commit(types.SET_COMMON_LOADING, false)
        throw error
      }
    }
  },

  authenticateAnonymously: async ({ commit }, payload) => {
    commit(types.SET_COMMON_LOADING, true)
    if (isEnabledFB) {
      try {
        const res = await Firebase.authenticateAnonymously(payload)
        const vals = {
          name: res.user.displayName,
          type: 'anonymous',
        }
        const idToken = await Firebase.getToken(res.user)
        const serviceUser = await User.createServiceUser('firebase', res.user.uid, vals)
        const user = {
          id: serviceUser.id,
          email: res.user.email,
          name: res.user.displayName,
          type: 'anonymous',
          uid: res.user.uid,
          serviceCode: 'firebase',
        }
        commit(types.AUTH_SET_USER, user)
        commit(types.AUTH_SET_TOKEN, idToken)
        commit(types.AUTH_UPDATE_STATE, true)
        commit(types.SET_COMMON_LOADING, false)
      } catch (error) {
        commit(types.AUTH_SET_USER, null)
        commit(types.AUTH_SET_TOKEN, null)
        commit(types.AUTH_UPDATE_STATE, false)
        commit(types.SET_COMMON_LOADING, false)
        throw error
      }
    } else {
      // TODO: Implemented not to use firebase
    }
  },

  checkAuthenticate: async ({ commit }) => {
    commit(types.SET_COMMON_LOADING, true)
    if (isEnabledFB) {
      try {
        const fbuser = await Firebase.checkAuth()
        if (fbuser) {
          const idToken = await Firebase.getToken(fbuser)
          const serviceUser = await User.getServiceUser('firebase', fbuser.uid, idToken)
          const user = {
            id: serviceUser.id,
            email: fbuser.email,
            name: fbuser.displayName,
            type: serviceUser.type,
            uid: fbuser.uid,
            serviceCode: 'firebase',
          }
          commit(types.SET_COMMON_LOADING, false)
          commit(types.AUTH_SET_USER, user)
          commit(types.AUTH_SET_TOKEN, idToken)
          commit(types.AUTH_UPDATE_STATE, true)
        } else {
          commit(types.SET_COMMON_LOADING, false)
        }
      } catch (error) {
        commit(types.AUTH_SET_USER, null)
        commit(types.AUTH_SET_TOKEN, null)
        commit(types.AUTH_UPDATE_STATE, false)
        commit(types.SET_COMMON_LOADING, false)
        throw error
      }
    } else {
      try {
        const user = await User.check()
        commit(types.AUTH_SET_USER, user)
        commit(types.AUTH_UPDATE_STATE, true)
        commit(types.SET_COMMON_LOADING, false)
      } catch (error) {
        commit(types.AUTH_SET_USER, null)
        commit(types.AUTH_SET_TOKEN, null)
        commit(types.AUTH_UPDATE_STATE, false)
        commit(types.SET_COMMON_LOADING, false)
        throw error
      }
    }
  },

  createUser: async ({ commit }, vals) => {
    commit(types.SET_COMMON_LOADING, true)
    if (isEnabledFB) {
      try {
        let res = await Firebase.createUser(vals)
        const uid = res.user.uid
        await Firebase.updateUserProfile(res.user, {displayName: vals.name})
        const idToken = await Firebase.getToken(res.user)
        const serviceUserVal = { uid:uid, name:vals.name }
        const serviceUser = await User.createServiceUser('firebase', uid, serviceUserVal, idToken)
        const user = {
          id: serviceUser.id,
          name: serviceUser.name,
          email: res.user.email,
          type: serviceUser.type,
          uid: uid,
          serviceCode: 'firebase',
        }
        commit(types.AUTH_SET_USER, user)
        commit(types.AUTH_SET_TOKEN, idToken)
        commit(types.AUTH_UPDATE_STATE, true)
        commit(types.SET_COMMON_LOADING, false)
      } catch (err) {
        commit(types.AUTH_SET_USER, null)
        commit(types.AUTH_SET_TOKEN, null)
        commit(types.AUTH_UPDATE_STATE, false)
        commit(types.SET_COMMON_LOADING, false)
        throw err
      }
    } else {
      try {
        const user = await User.create(vals)
        commit(types.AUTH_SET_USER, user)
        commit(types.AUTH_UPDATE_STATE, true)
        commit(types.SET_COMMON_LOADING, false)
      } catch (err) {
        commit(types.AUTH_SET_USER, null)
        commit(types.AUTH_SET_TOKEN, null)
        commit(types.AUTH_UPDATE_STATE, false)
        commit(types.SET_COMMON_LOADING, false)
        throw err
      }
    }
  },

  signOut: ({ commit }) => {
    commit(types.SET_COMMON_LOADING, true)
    if (isEnabledFB) {
      return Firebase.signOut()
        .then(() => {
          commit(types.AUTH_SET_USER, null)
          commit(types.AUTH_SET_TOKEN, null)
          commit(types.AUTH_UPDATE_STATE, false)
          commit(types.SET_COMMON_LOADING, false)
        })
        .catch(err => {
          commit(types.SET_COMMON_LOADING, false)
          throw err
        })
    } else {
      return User.signOut()
        .then(() => {
          commit(types.AUTH_SET_USER, null)
          commit(types.AUTH_SET_TOKEN, null)
          commit(types.AUTH_UPDATE_STATE, false)
          commit(types.SET_COMMON_LOADING, false)
        })
        .catch(error => {
          commit(types.SET_COMMON_LOADING, false)
          throw error
        })
    }
  },

  resetAuth: ({ commit }) => {
    commit(types.AUTH_SET_USER, null)
    commit(types.AUTH_SET_TOKEN, null)
    commit(types.AUTH_UPDATE_STATE, false)
  },

  setIsLoading: ({ commit }, isLoading) => {
    commit(types.SET_COMMON_LOADING, isLoading)
  },

  setChat: ({ commit }, payload) => {
    commit(types.SET_COMMON_LOADING, true)
    return Chat.get(payload.chatId, payload.token)
      .then(res => {
        commit(types.SET_CHAT, res)
        commit(types.SET_COMMON_LOADING, false)
      })
      .catch(err => {
        commit(types.SET_COMMON_LOADING, false)
        throw err
      })
  },

  setChatCommentChatId: ({ commit }, chatId) => {
    commit(types.SET_CHAT_COMMENT_CHAT_ID, chatId)
  },

  resetChatCommentList: ({ commit }, chatId) => {
    commit(types.SET_CHAT_COMMENT_CHAT_ID, chatId)
    commit(types.RESET_CHAT_COMMENT_LIST)
  },

  fetchChatComments: ({ commit }, payload) => {
    commit(types.SET_COMMON_LOADING, true)
    return ChatComment.fetch(payload.chatId, payload.params, payload.token)
      .then(({ res }) => {
        commit(types.FETCH_CHAT_COMMENT_LIST, res.comments)
        commit(types.SET_CHAT_COMMENT_NEXT_ID, res.nextId)
        commit(types.SET_COMMON_LOADING, false)
      })
      .catch(err => {
        commit(types.SET_COMMON_LOADING, false)
        throw err
      })
  },

  createChatComment: ({ commit }, payload) => {
    return ChatComment.create(payload.chatId, payload.vals, payload.token)
      .then((item) => {
        commit(types.CREATE_CHAT_COMMENT, item)
      })
      .catch(err => { throw err })
  },

  addChatComment: ({ commit }, payload) => {
    commit(types.ADD_CHAT_COMMENT, payload)
  },

  createExample: ({ commit }, payload) => {
    return Example.create(payload)
      .then((item) => {
        commit(types.CREATE_EXAMPLE, item)
      })
      .catch(err => { throw err })
  },

  updateExample: ({ commit }, payload) => {
    return Example.update(payload.exampleId, payload.values)
      .then((item) => {
        commit(types.UPDATE_EXAMPLE, {
          exampleId: payload.exampleId,
          values: item,
        })
      })
      .catch(err => { throw err })
  },

  deleteExample: ({ commit }, presetId) => {
    return Example.delete(presetId)
      .then((item) => {
        const data = {
          exampleId: presetId,
          values: item,
        }
        commit(types.DELETE_EXAMPLE, data)
      })
      .catch(err => { throw err })
  },
}

