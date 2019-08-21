/**
 * a base page that does not have permission requirements
 * all roles can be accessed
 *
 * @summary constantRoutes
 * @author xiao.guo
 *
 * Created at     : 2019-08-17 15:08:18 
 * Last modified  : 2019-08-19 11:18:00
 */

const Login = () => import('@/views/login/index')
const Layout = () => import('@/views/layout/index')

const constantRoutes = [
  {
    path: '/login',
    component: Login,
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: {title: 'Dashboard', icon: 'dashboard'}
      }
    ]
  }
]

export default constantRoutes
