/**
 * 1. modules 是针对 state, 而 namespaced 是针对 mutations, actions 和 getters 
 * 2. 利用 require.context 自动导入 modules
 * 3. 使用 vuex-persistedstate 存储 token 和 size
 *
 * @summary Store Module
 * @author xiao.guo
 *
 * Created at     : 2019-08-16 16:25:02 
 * Last modified  : 2019-08-21 16:36:25
 */

import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'

import createPersistedState from 'vuex-persistedstate'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const modulesFiles = require.context('./modules', false, /\.js$/)
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

// Customize Storage
const persistedState = createPersistedState({
  paths: ['user.token', 'setting.size']
  // 默认使用 localstorage，使用 cookie 不生效, 没办法有效保存 size 和 token 信息
  // storage: {
  //   getItem: key => Cookies.get(key),
  //   setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
  //   removeItem: key => Cookies.remove(key)
  // } 
})

const isDebug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules,
  getters,
  strict: isDebug,
  plugins: isDebug ? [createLogger(), persistedState] : [persistedState]
})
