import mock from '../mock'
import user from '../datas/user'

mock.onPost('/user/login').reply(config => {
  const { username } = JSON.parse(config.data)
  const token = user.tokens[username].token
  return new Promise(resolve => {
    setTimeout(() => {
      if (!token) {
        resolve([200, {code: 60204, message: 'Account or password are incorrect'}])
      } else {
        resolve([200, {code: 20000, token}])
      }
    }, 300)
  })
})

mock.onGet('/user/getInfo').reply(config => {
  const token = config.headers.token
  const userInfo = user.users[token]
  return new Promise(resolve => {
    if (!userInfo) {
      resolve([200, {code: 50008, message: 'Login failed, unable to get user details.'}])
    } else {
      resolve([200, {code: 20000, userInfo}])
    }
  })
})
