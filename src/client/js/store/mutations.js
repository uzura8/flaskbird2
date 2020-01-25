import * as types from './mutation-types'

export default {
  [types.SET_COMMON_LOADING] (state, isLoading) {
    state.common.isLoading = isLoading
  },

  [types.AUTH_SET_USER] (state, payload) {
    state.auth.user = payload
  },

  [types.AUTH_SET_TOKEN] (state, payload) {
    state.auth.token = payload
  },

  [types.AUTH_UPDATE_STATE] (state, payload) {
    state.auth.state = payload
  },

  [types.SET_COMMON_HEADER_MENU_OPEN] (state, isOpen) {
    state.common.isHeaderMenuOpen = isOpen
  },

  [types.FETCH_EXAMPLES_LIST] (state, payload) {
    state.example.list = payload
  },

  [types.CREATE_EXAMPLE] (state, payload) {
    state.example.list.push(payload)
  },

  [types.UPDATE_EXAMPLE] (state, payload) {
    const exampleId = payload.exampleId
    const values = payload.values
    const index = state.example.list.findIndex(item => item.id === exampleId)
    state.example.list.splice(index, 1, values)
  },

  [types.DELETE_EXAMPLE] (state, payload) {
    const id = payload.exampleId
    for (let i = 0, n = state.example.list.length; i < n; i++) {
      const example = state.example.list[i]
      if (example.id !== id) continue
      state.example.list.splice(i, 1)
      break
    }
  },
}
