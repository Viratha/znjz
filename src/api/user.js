import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/vue-admin-template/user/login',

    baseURL: 'http://47.93.33.180:8081/login',

    method: 'post',
    data
  })
}

export function getInfo_old(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}
export function getInfo(username, password, code, token) {
  return request({
    url: '/login',
    method: 'post',
    params: { username, password, code, token }
  })
}

export function logout() {
  return request({
    // url: '/vue-admin-template/user/logout',
    url: '/logout',
    method: 'post',
    baseURL: 'http://47.93.33.180:8081/'

  })
}

// 上传头像文件接口 参数 文件
export function avatar_upload(Author, formData) {
  return request({
    url:'/sys/user/upload',
    method: 'post',
    data: formData,
    baseURL: 'http://47.93.33.180:8081/',
    headers: {
      'Authorization': Author,
      'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundarypgnnfMj7vzrDwtRZ'
    }
    // params
  })
}

//获取用户头像接口
export function user_avatar(Author) {
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