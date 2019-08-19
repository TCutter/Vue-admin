/**
 * a base page that does not have permission requirements
 * all roles can be accessed
 *
 * @summary constantRoutes
 * @author xiao.guo
 *
 * Created at     : 2019-08-17 15:08:18 
 * Last modified  : 2019-08-17 15:12:16
 */

const Login = () => import('@/views/login/index')

const constantRoutes = [
  {
    path: '/login',
    component: Login,
    hidden: true
  }
]

export default constantRoutes
