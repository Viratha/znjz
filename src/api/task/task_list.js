import request from '@/utils/request'

// 获取任务列表
export function task_list(Author) {
  return request({
    url: '/sys/task/list?page=1&limit=30',
    method: 'get',
    baseURL: 'http://47.93.33.180:8081/',
    headers: {
      'Authorization': Author
    }
    // params
  })
}

// 增加任务 body/params 名字 详情 持续时间：单位为min
export function task_list_add(Author, name, detail, time) {
  return request({
    url: '/sys/task/add?name=' + name + '&detail=' + detail + '&time=' + time,
    method: 'post',

    baseURL: 'http://47.93.33.180:8081/',
    headers: {
      'Authorization': Author
    }
    // params
  })
}

// 删除任务
export function task_list_del(Author, id) {
  return request({
    url: '/sys/task/delete?id=' + id,
    method: 'delete',
    baseURL: 'http://47.93.33.180:8081/',
    headers: {
      'Authorization': Author
    }
    // params
  })
}

// 根据id获取任务详情
export function task_list_detail(Author) {
  return request({
    url: '/sys/task/list?page=1&limit=30',
    method: 'get',
    baseURL: 'http://47.93.33.180:8081/',
    headers: {
      'Authorization': Author
    }
    // params
  })
}

// 上传文件接口 参数 文件 用户名 文件名 任务id
export function task_list_upload(Author, formData, tid, username) {
  return request({
    url: '/sys/file/upload?filename=tes&tid=' + tid + '&username=' + username,
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

// 完成任务列表
export function task_list_finished(Author) {
  return request({
    url: '/sys/task/finished?page=1&limit=20',
    method: 'get',
    baseURL: 'http://47.93.33.180:8081/',
    headers: {
      'Authorization': Author
    }
    // params
  })
}

// 未完成任务列表
export function task_list_unfinished(Author) {
  return request({
    url: '/sys/task/unfinished',
    method: 'get',
    baseURL: 'http://47.93.33.180:8081/',
    headers: {
      'Authorization': Author
    }
  })
}

