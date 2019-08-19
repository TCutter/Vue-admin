import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = baseURL + requestURL
  timeout: 3000
})

request.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['token'] = store.getters.token
  }
  return config
}, error => {
  return Promise.reject(error)
})

request.interceptors.response.use(res => {
  
}, err => {
  switch (err.status) {
    case 400:
      err.message = 'Bad Request'
      break
    case 401:
      err.message = 'Unauthorized'
      break
    case 403:
        err.message = 'Forbidden'
        break
    case 404:
        err.message = 'Not Found'
        break
    case 408:
        err.message = 'Reqeust Timeout'
        break
    case 500:
        err.message = 'Internal Server Error'
        break
    case 503:
        err.message = 'Service Unavailable'
        break
    case 504:
        err.message = 'Gateway Timeout'
        break
    default:
        err.message = 'Request Error'
        break
  }

  Message({
    message: err.message,
    type: 'error',
    duration: 3 * 1000
  })
  return Promise.reject(err)
})

export default request
