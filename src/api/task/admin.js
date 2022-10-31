import request from '@/utils/request'

export function is_admin(Author) {
  return request({
    url: '/sys/menu/role',
    method: 'get',
    baseURL: 'http://47.106.183.36:8081/',
    headers: {
      'Authorization': Author
    }
    // params
  })
}

export function task_finished_forAdmin(Author, tid) {
  return request({
    url: '/sys/task/finished?id=' + tid + '&page=1&limit=100',
    method: 'get',
    baseURL: 'http://47.106.183.36:8081/',

    headers: {
      'Authorization': Author
    }
    // params
  })
}

// 这个后端好像有问题
export function task_unfinished_forAdmin(Author, tid) {
  return request({
    url: '/sys/task/unfinished?id=' + tid + '&page=1&limit=100',
    method: 'get',
    baseURL: 'http://47.106.183.36:8081/',

    headers: {
      'Authorization': Author
    }
    // params
  })
}
