import request from '@/utils/request'

export function home_bg(Author) {
  return request({
    url: '/sys/file/homebg',
    method: 'get',
    baseURL: 'http://47.106.183.36:8081/',

    headers: {
      'Authorization': Author
    }
    // params
  })
}
export function login_bg() {
  return request({
    url: '/sys/file/loginbg',
    method: 'get',
    baseURL: 'http://47.106.183.36:8081/'

    // params
  })
}

