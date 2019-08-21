/* eslint-disable prefer-promise-reject-errors */
import * as types from '../mutation-types'
import { login, logout, getInfo } from '@/api/user'
import { resetRouter } from '@/router'

const state = {
  token: '',
  roles: [],
  name: '',
  avatar: '',
  introduction: ''
}

const mutations = {
  [types.SET_TOKEN] (state, token) {
    state.token = token
  },
  [types.SET_ROLES] (state, roles) {
    state.roles = roles
  },
  [types.SET_NAME] (state, name) {
    state.name = name
  },
  [types.SET_INTRODUCTION] (state, introduction) {
    state.introduction = introduction
  },
  [types.SET_AVATAR] (state, avatar) {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login ({commit}, userInfo) {
    const {username, password} = userInfo
    return new Promise((resolve, reject) => {
      login({username, password})
        .then(res => {
          const {data} = res
          commit(types.SET_TOKEN, data.token)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // user logout
  logout ({commit}) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          commit(types.SET_TOKEN, '')
          commit(types.SET_ROLES, [])
          resetRouter()
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // get user info 
  getInfo ({commit, state}) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(res => {
          const { data } = res
          if (!data) {
            reject('Verification failed, please Login again.')
          }
          const { roles, name, avatar, introduction } = data.userInfo
          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject('getInfo: roles must be a non-null array!')
          }
          commit(types.SET_ROLES, roles)
          commit(types.SET_NAME, name)
          commit(types.SET_AVATAR, avatar)
          commit(types.SET_INTRODUCTION, introduction)
          resolve(data.userInfo)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
