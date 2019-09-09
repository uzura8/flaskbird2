import * as types from './mutation-types'
import { Example, User } from '../api'

export default {
  setHeaderMenuOpen: ({ commit }, isOpen) => {
    commit(types.SET_COMMON_HEADER_MENU_OPEN, isOpen)
  },

  authenticate: ({ commit }, payload) => {
    commit(types.SET_COMMON_LOADING, true)
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
      })
  },

  checkAuthenticate: ({ commit }, payload) => {
    commit(types.SET_COMMON_LOADING, true)
    return User.check(payload)
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
      })
  },

  signOut: ({ commit }, payload) => {
    commit(types.SET_COMMON_LOADING, true)
    return User.signOut(payload)
      .then(() => {
        commit(types.SET_COMMON_LOADING, false)
        commit(types.AUTH_SET_USER, null)
        commit(types.AUTH_UPDATE_STATE, false)
        commit(types.AUTH_SET_ERROR, null)
      })
      .catch(error => {
        commit(types.AUTH_SET_ERROR, error.message)
      })
  },

  setIsLoading: ({ commit }, isLoading) => {
    commit(types.SET_COMMON_LOADING, isLoading)
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

