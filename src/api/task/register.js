import request from '@/utils/request'

// 注册用
export function register(username, password, Email) {
  return request({
    url: '/sys/user/register',
    method: 'post',
    baseURL: 'http://123.56.83.121:8081/',

    data: ({ // 这里是发送给后台的数据
      username: username,
      password: password,
      email: Email
    })

  })
}

