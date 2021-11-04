import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/vue-admin-template/user/login',

    baseURL: 'http://47.93.33.180:8081/login',

    method: 'post',
    data
  })
}

export function getInfo_old(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}
export function getInfo(username, password, code, token) {
  return request({
    url: '/login',
    method: 'post',
    params: { username, password, code, token }
  })
}

export function logout() {
  return request({
    // url: '/vue-admin-template/user/logout',
    url: '/logout',
    method: 'post',
    baseURL: 'http://47.93.33.180:8081/'

  })
}
