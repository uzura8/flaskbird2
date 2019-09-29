import * as types from './mutation-types'
import { Example, User, ChatComment, Firebase } from '@/api'
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
        const user = {
          id: res.user.uid,
          uid: res.user.uid,
          email: res.user.email,
          name: res.user.displayName
        }
        const idToken = await Firebase.getToken(res.user)
        commit(types.SET_COMMON_LOADING, false)
        commit(types.AUTH_SET_USER, user)
        commit(types.AUTH_SET_TOKEN, idToken)
        commit(types.AUTH_UPDATE_STATE, true)
      } catch (error) {
        commit(types.SET_COMMON_LOADING, false)
        commit(types.AUTH_UPDATE_STATE, false)
        commit(types.AUTH_SET_USER, null)
        commit(types.AUTH_SET_TOKEN, null)
        throw error
      }
    } else {
      try {
        const user = User.authenticate(payload)
        commit(types.SET_COMMON_LOADING, false)
        commit(types.AUTH_SET_USER, user)
        commit(types.AUTH_UPDATE_STATE, true)
      } catch (error) {
        commit(types.SET_COMMON_LOADING, false)
        commit(types.AUTH_UPDATE_STATE, false)
        throw error
      }
    }
  },

  authenticateAnonymously: async ({ commit }, payload) => {
    commit(types.SET_COMMON_LOADING, true)
    if (isEnabledFB) {
      try {
        const res = await Firebase.authenticateAnonymously(payload)
        User.createServiceUser('firebase', res.user.uid, { name:res.user.displayName })
        const user = {
          id: res.user.uid,
          uid: res.user.uid,
          email: res.user.email,
          name: res.user.displayName
        }
        commit(types.SET_COMMON_LOADING, false)
        commit(types.AUTH_SET_USER, user)
        commit(types.AUTH_UPDATE_STATE, true)
      } catch (error) {
        commit(types.SET_COMMON_LOADING, false)
        commit(types.AUTH_UPDATE_STATE, false)
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
        if (!fbuser) {
          throw new Error('Auth error')
        }
        const user = {
          id: fbuser.uid,
          uid: fbuser.uid,
          email: fbuser.email,
          name: fbuser.displayName
        }
        const idToken = await Firebase.getToken(fbuser)
        commit(types.SET_COMMON_LOADING, false)
        commit(types.AUTH_SET_USER, user)
        commit(types.AUTH_SET_TOKEN, idToken)
        commit(types.AUTH_UPDATE_STATE, true)
      } catch (error) {
        commit(types.SET_COMMON_LOADING, false)
        commit(types.AUTH_SET_USER, null)
        commit(types.AUTH_SET_TOKEN, null)
        commit(types.AUTH_UPDATE_STATE, false)
        throw error
      }
    } else {
      try {
        const user = await  User.check()
        commit(types.SET_COMMON_LOADING, false)
        commit(types.AUTH_SET_USER, user)
        commit(types.AUTH_UPDATE_STATE, true)
      } catch (error) {
        commit(types.SET_COMMON_LOADING, false)
        commit(types.AUTH_UPDATE_STATE, false)
        throw error
      }
    }
  },

  signOut: ({ commit }) => {
    commit(types.SET_COMMON_LOADING, true)
    if (isEnabledFB) {
      return Firebase.signOut()
        .then(() => {
          commit(types.SET_COMMON_LOADING, false)
          commit(types.AUTH_SET_USER, null)
          commit(types.AUTH_UPDATE_STATE, false)
        })
        .catch(error => {
          throw error
        })
    } else {
      return User.signOut()
        .then(() => {
          commit(types.SET_COMMON_LOADING, false)
          commit(types.AUTH_SET_USER, null)
          commit(types.AUTH_UPDATE_STATE, false)
        })
        .catch(error => {
          throw error
        })
    }
  },

  resetAuth: ({ commit }) => {
    commit(types.AUTH_SET_USER, null)
    commit(types.AUTH_UPDATE_STATE, false)
  },

  setIsLoading: ({ commit }, isLoading) => {
    commit(types.SET_COMMON_LOADING, isLoading)
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
    return ChatComment.fetch(payload.chatId, payload.params)
      .then(({ lists }) => {
        commit(types.FETCH_CHAT_COMMENT_LIST, lists)
        commit(types.SET_COMMON_LOADING, false)
      })
      .catch(err => {
        commit(types.SET_COMMON_LOADING, false)
        throw err
      })
  },

  createChatComment: ({ commit }, payload) => {
    return ChatComment.create(payload.chatId, payload.vals)
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

