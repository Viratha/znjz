import request from '@/utils/request'

// 注册用
export function register(username, password, Email) {
  return request({
    url: '/sys/user/register',
    method: 'post',
    baseURL: 'http://47.106.183.36:8081/',

    data: { // 这里是发送给后台的数据
      username: username,
      password: password,
      email: Email
    }

  })
}

