import router from './index'
import store from '@/store'
import { Message } from 'element-ui'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure(
  {showSpinner: false}
)

const WhiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  const token = store.getters.token
  if (token) {
    if (to.path === '/login') {
      // if logged in, redirect to the home page
      next({path: '/'})
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        // 说明已经登陆过，直接进入
        next()
      } else {
        try {
          // generate accessible routes map based on roles
          const { roles } = await store.dispatch('user/getInfo')
          
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          // set the replace: true, so the navigation will not leave a history record
          next({...to, replace: true})
        } catch (err) {
          await store.dispatch('user/logout')
          Message.error(err || 'Had Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (WhiteList.includes(to.path)) {
      // 免登陆白名单直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach((to, from) => {
  // to and from are both route objects.
  NProgress.done()
})
