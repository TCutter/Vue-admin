/**
 * 通过token获取用户对应的 role，
 * 动态根据用户的 role 算出其对应有权限的路由，
 * 通过 router.addRoutes 动态挂载这些路由
 *
 * @summary 登陆及权限
 * @author xiao.guo
 *
 * Created at     : 2019-08-19 10:18:06 
 * Last modified  : 2019-09-16 10:02:22
 */

import constantRoutes from '@/router/constantRoutes'
import asyncRoutes from '@/router/asyncRoutes'

import { SET_ROUTES } from '@/store/mutation-types'

/**
 * Use meta.roles to determine if the current user has permission
 * @param {*} roles 
 * @param {*} route 
 */
const hasPermission = (roles, route) => {
  if (route.meta && route.meta.roles) {
    roles.some(role => route.meta.roles.includes(role))
  } else {
    // 没有设置 meta 或者 roles 说明拥有全部权限
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param {Array} routes asyncRoutes
 * @param {Array} roles 
 */
export function filterAsyncRoutes (routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = {...route}
    if (hasPermission(roles, route)) {
      if (tmp.children && tmp.children.length > 0) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
}

const state = {
  routes: [], // 当前 routes
  addRoutes: [] // 被添加的 routes
}

const mutations = {
  [SET_ROUTES] (state, routes) {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes ({commit}, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit(SET_ROUTES, accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
