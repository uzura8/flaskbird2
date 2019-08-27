import * as types from './mutation-types'
import { Example } from '../api'

export default {
  setHeaderMenuOpen: ({ commit }, isOpen) => {
    commit(types.SET_COMMON_HEADER_MENU_OPEN, isOpen)
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

