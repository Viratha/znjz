import request from '@/utils/request'

export function login_new(params) {
  return request({
    url: '/login',
    method: 'post',
    baseURL: 'http://123.56.83.121:8081/',

    params
  })
}

// code
export function code() {
  return request({
    url: '/captcha',
    method: 'get',
    baseURL: 'http://123.56.83.121:8081/'

  })
}

