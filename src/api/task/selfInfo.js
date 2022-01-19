import request from '@/utils/request'

/* 获取个人信息 */
export function selfInfo(Author) {
  console.log(Author)
  return request({
    url: '/sys/user/current',
    method: 'get',
    baseURL: 'http://47.93.33.180:8081/',
    headers: {
      'Authorization': Author
    }
    // params
  })
}

