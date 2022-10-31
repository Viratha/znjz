import request from '@/utils/request'

/* 返回投票列表 */
export function findList(Author) {
  return request({
    url: '/vote/find',
    method: 'post',
    baseURL: 'http://47.106.183.36:8081/',
    headers: {
      'Authorization': Author
    }
    // params
  })
}
// 投票
export function vote(Author, alternativeName, username) {
  return request({
    url: '/vote/cheakvote',
    method: 'get',
    baseURL: 'http://47.106.183.36:8081/',
    headers: {
      'Authorization': Author
    },
    params: {
      'alternativeName': alternativeName,
      'voter': username
    }
  })
}
// 注册投票人
export function voter(Author, alternativeName) {
  return request({
    url: '/vote/addvote',
    method: 'post',
    baseURL: 'http://47.106.183.36:8081/',
    headers: {
      'Authorization': Author
    },
    params: {
      'alternativeName': alternativeName

    }
  })
}
// 数票
export function count(Author, alternativeName) {
  return request({
    url: '/vote/addnums',
    method: 'post',
    baseURL: 'http://47.106.183.36:8081/',
    headers: {
      'Authorization': Author
    },
    params: {
      'alternativeName': alternativeName
    }
  })
}

