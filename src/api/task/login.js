import request from '@/utils/request'

export function login_new(params) {
  return request({
    url: '/login',
    method: 'post',
    baseURL: 'http://47.106.183.36:8081/',

    params
  })
}

// code
export function code() {
  return request({
    url: '/captcha',
    method: 'get',
    baseURL: 'http://47.106.183.36:8081/'
  })
}

