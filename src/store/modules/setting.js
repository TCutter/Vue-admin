import * as types from '../mutation-types'
import variables from '@/styles/element-variables.scss'

const state = {
  sidebar: true, // true means opend
  size: 'medium',
  theme: variables.theme
}

const mutations = {
  [types.TOGGLE_SIDEBAR] (state) {
    state.sidebar = !state.sidebar
  },
  [types.SET_SIZE] (state, size) {
    state.size = size
  },
  [types.SET_THEME] (state, theme) {
    state.theme = theme
  }
}

const actions = {
  toggele_sidebar ({commit}) {
    commit(types.TOGGLE_SIDEBAR)
  },
  setSize ({commit}, size) {
    commit(types.SET_SIZE, size)
  },
  setTheme ({commit}, theme) {
    commit(types.SET_THEME, theme)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
