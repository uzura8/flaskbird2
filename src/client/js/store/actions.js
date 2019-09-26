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
    commit(types.AUTH_SET_ERROR, null)
  },

  authenticate: ({ commit }, payload) => {
    commit(types.SET_COMMON_LOADING, true)
    if (isEnabledFB) {
      return Firebase.authenticate(payload)
        .then(res => {
          const user = {
            id: res.user.uid,
            uid: res.user.uid,
            email: res.user.email,
            name: res.user.displayName
          }
          commit(types.SET_COMMON_LOADING, false)
          commit(types.AUTH_SET_USER, user)
          commit(types.AUTH_UPDATE_STATE, true)
          commit(types.AUTH_SET_ERROR, null)
        })
        .catch(error => {
          commit(types.SET_COMMON_LOADING, false)
          commit(types.AUTH_UPDATE_STATE, false)
          commit(types.AUTH_SET_ERROR, error.message)
          throw error
        })
    } else {
      return User.authenticate(payload)
        .then(user => {
          commit(types.SET_COMMON_LOADING, false)
          commit(types.AUTH_SET_USER, user)
          commit(types.AUTH_UPDATE_STATE, true)
          commit(types.AUTH_SET_ERROR, null)
        })
        .catch(error => {
          commit(types.SET_COMMON_LOADING, false)
          commit(types.AUTH_UPDATE_STATE, false)
          commit(types.AUTH_SET_ERROR, error.message)
          throw error
        })
    }
  },

  authenticateAnonymously: ({ commit }, payload) => {
    commit(types.SET_COMMON_LOADING, true)
    if (isEnabledFB) {
      return Firebase.authenticateAnonymously(payload)
        .then(res => {
          const user = {
            id: res.user.uid,
            uid: res.user.uid,
            email: res.user.email,
            name: res.user.displayName
          }
          commit(types.SET_COMMON_LOADING, false)
          commit(types.AUTH_SET_USER, user)
          commit(types.AUTH_UPDATE_STATE, true)
          commit(types.AUTH_SET_ERROR, null)
        })
        .catch(error => {
          commit(types.SET_COMMON_LOADING, false)
          commit(types.AUTH_UPDATE_STATE, false)
          commit(types.AUTH_SET_ERROR, error.message)
          throw error
        })
    } else {
      // TODO: Implemented not to use firebase
    }
  },

  checkAuthenticate: ({ commit }) => {
    commit(types.SET_COMMON_LOADING, true)
    if (isEnabledFB) {
      return Firebase.checkAuth()
        .then(fbuser => {
          if (fbuser) {
            const user = {
              id: fbuser.uid,
              uid: fbuser.uid,
              email: fbuser.email,
              name: fbuser.displayName
            }
            commit(types.SET_COMMON_LOADING, false)
            commit(types.AUTH_SET_USER, user)
            commit(types.AUTH_UPDATE_STATE, true)
            commit(types.AUTH_SET_ERROR, null)
          } else {
            commit(types.SET_COMMON_LOADING, false)
            commit(types.AUTH_SET_USER, null)
            commit(types.AUTH_UPDATE_STATE, false)
            commit(types.AUTH_SET_ERROR, null)
          }
        })
        .catch(error => {
          commit(types.SET_COMMON_LOADING, false)
          commit(types.AUTH_UPDATE_STATE, false)
          commit(types.AUTH_SET_ERROR, error.message)
          throw error
        })
    } else {
      return User.check()
        .then(user => {
          commit(types.SET_COMMON_LOADING, false)
          commit(types.AUTH_SET_USER, user)
          commit(types.AUTH_UPDATE_STATE, true)
          commit(types.AUTH_SET_ERROR, null)
        })
        .catch(error => {
          commit(types.SET_COMMON_LOADING, false)
          commit(types.AUTH_UPDATE_STATE, false)
          commit(types.AUTH_SET_ERROR, error.message)
          throw error
        })
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
          commit(types.AUTH_SET_ERROR, null)
        })
        .catch(error => {
          commit(types.AUTH_SET_ERROR, error.message)
          throw error
        })
    } else {
      return User.signOut()
        .then(() => {
          commit(types.SET_COMMON_LOADING, false)
          commit(types.AUTH_SET_USER, null)
          commit(types.AUTH_UPDATE_STATE, false)
          commit(types.AUTH_SET_ERROR, null)
        })
        .catch(error => {
          commit(types.AUTH_SET_ERROR, error.message)
          throw error
        })
    }
  },

  resetAuth: ({ commit }) => {
    commit(types.AUTH_SET_USER, null)
    commit(types.AUTH_UPDATE_STATE, false)
    commit(types.AUTH_SET_ERROR, null)
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

