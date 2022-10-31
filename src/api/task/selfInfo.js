import request from '@/utils/request'

/* 获取个人信息 */
export function selfInfo(Author) {
  console.log(Author)
  return request({
    url: '/sys/user/current',
    method: 'get',
    baseURL: 'http://47.106.183.36:8081/',
    headers: {
      'Authorization': Author
    }
    // params
  })
}

