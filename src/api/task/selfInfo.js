import request from '@/utils/request'

/* 获取个人信息 */
export function selfInfo(Author) {
  console.log(Author)
  return request({
    url: '/sys/user/current',
    method: 'get',
    baseURL: 'http://123.56.83.121:8081/',
    headers: {
      'Authorization': Author
    }
    // params
  })
}

