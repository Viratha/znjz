import request from '@/utils/request'

/* 签到 */
export function sign(Author, username) {
  return request({
    url: '/sys/register/register?username=' + encodeURIComponent(username),
    method: 'post',
    baseURL: 'http://47.106.183.36:8081/',
    headers: {
      'Authorization': Author
    }
    // params
  })
}

// 签退
export function signout(Author, username) {
  return request({
    url: '/sys/register/finishregister?username=' + encodeURIComponent(username),
    method: 'put',
    baseURL: 'http://47.106.183.36:8081/',
    headers: {
      'Authorization': Author
    }
    // params
  })
}

// 获取签到列表
export function sign_list(Author) {
  return request({
    url: '/sys/register/list?page=1&limit=100',
    method: 'get',
    baseURL: 'http://47.106.183.36:8081/',
    headers: {
      'Authorization': Author
    }

  })
}

export function sign_list_myself(Author, username) {
  return request({
    url: '/sys/register/list?username=' + encodeURIComponent(username),
    method: 'get',
    baseURL: 'http://47.106.183.36:8081/',
    headers: {
      'Authorization': Author
    }
  })
}
