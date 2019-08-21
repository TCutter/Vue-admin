import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'

axios.defaults.timeout = 3000
axios.defaults.baseURL = ''

axios.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['token'] = store.getters.token
  }
  return config
}, error => {
  console.log(error)
  return Promise.reject(error)
})

axios.interceptors.response.use(res => {
  return res
}, err => {
  let { response } = err
  switch (response.status) {
    case 400:
        response.message = 'Bad Request'
        break
    case 401:
        response.message = 'Unauthorized'
        break
    case 403:
        response.message = 'Forbidden'
        break
    case 404:
        response.message = 'Not Found'
        break
    case 408:
        response.message = 'Reqeust Timeout'
        break
    case 500:
        response.message = 'Internal Server Error'
        break
    case 503:
        response.message = 'Service Unavailable'
        break
    case 504:
        response.message = 'Gateway Timeout'
        break
    default:
        response.message = 'Request Error'
        break
  }
  response.message = response.status + ' ' + response.message
  Message({
    message: response.message,
    type: 'error',
    duration: 3 * 1000
  })
  return Promise.reject(err)
})

export default axios
