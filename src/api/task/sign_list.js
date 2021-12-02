import request from '@/utils/request'

/* 签到 */
export function sign(Author, username) {
  console.log(Author)
  return request({
    url: '/sys/register/register?username=' + username,
    method: 'post',
    baseURL: 'http://47.93.33.180:8081/',
    headers: {
      'Authorization': Author
    }
    // params
  })
}

// 签退
export function signout(Author, username) {
  console.log(Author)
  return request({
    url: '/sys/register/finishregister?username=' + username,
    method: 'put',
    baseURL: 'http://47.93.33.180:8081/',
    headers: {
      'Authorization': Author
    }
    // params
  })
}
