import request from '@/utils/request'

// 获取任务列表
export function task_list() {
  return request({
    url: '/sys/task/list?page=1&limit=30',
    method: 'get',
    baseURL: 'http://47.93.33.180:8081/',
    headers: {
      'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTYzNTYyMDAwMiwiZXhwIjoxNjM2MjI0ODAyfQ.hUNBETw596S0-hgxvD3oAp5z_FGjMFin1sHIGSQSkcJN0uEq6EQXWqVouokpgw1e7lzeMnMVW2i9lV3rGmDqkA'
    }
    // params
  })
}

// 增加任务 body/params 名字 详情 持续时间：单位为min
export function task_list_add() {
  return request({
    url: '/sys/task/add',
    method: 'post',
    baseURL: 'http://47.93.33.180:8081/',
    headers: {
      'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTYzNTYyMDAwMiwiZXhwIjoxNjM2MjI0ODAyfQ.hUNBETw596S0-hgxvD3oAp5z_FGjMFin1sHIGSQSkcJN0uEq6EQXWqVouokpgw1e7lzeMnMVW2i9lV3rGmDqkA'
    }
    // params
  })
}

// 删除任务
export function task_list_del(id) {
  return request({
    url: '/sys/task/delete?id=' + id,
    method: 'delete',
    baseURL: 'http://47.93.33.180:8081/',
    headers: {
      'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTYzNTYyMDAwMiwiZXhwIjoxNjM2MjI0ODAyfQ.hUNBETw596S0-hgxvD3oAp5z_FGjMFin1sHIGSQSkcJN0uEq6EQXWqVouokpgw1e7lzeMnMVW2i9lV3rGmDqkA'
    }
    // params
  })
}

// 根据id获取任务详情
export function task_list_detail() {
  return request({
    url: '/sys/task/list?page=1&limit=30',
    method: 'get',
    baseURL: 'http://47.93.33.180:8081/',
    headers: {
      'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTYzNTYyMDAwMiwiZXhwIjoxNjM2MjI0ODAyfQ.hUNBETw596S0-hgxvD3oAp5z_FGjMFin1sHIGSQSkcJN0uEq6EQXWqVouokpgw1e7lzeMnMVW2i9lV3rGmDqkA'
    }
    // params
  })
}

// 上传文件接口 参数 文件 用户名 文件名 任务id
export function task_list_upload() {
  return request({
    url: '/sys/file/upload',
    method: 'post',
    baseURL: 'http://47.93.33.180:8081/',
    headers: {
      'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTYzNTYyMDAwMiwiZXhwIjoxNjM2MjI0ODAyfQ.hUNBETw596S0-hgxvD3oAp5z_FGjMFin1sHIGSQSkcJN0uEq6EQXWqVouokpgw1e7lzeMnMVW2i9lV3rGmDqkA'
    }
    // params
  })
}

// 完成任务列表
export function task_list_finished() {
  return request({
    url: '/sys/task/finished?id=1&page=1&limit=20',
    method: 'get',
    baseURL: 'http://47.93.33.180:8081/',
    headers: {
      'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTYzNTYyMDAwMiwiZXhwIjoxNjM2MjI0ODAyfQ.hUNBETw596S0-hgxvD3oAp5z_FGjMFin1sHIGSQSkcJN0uEq6EQXWqVouokpgw1e7lzeMnMVW2i9lV3rGmDqkA'
    }
    // params
  })
}

// 未完成任务列表
export function task_list_unfinished() {
  return request({
    url: '/sys/task/unfinished?id=1&page=1&limit=20',
    method: 'get',
    baseURL: 'http://47.93.33.180:8081/',
    headers: {
      'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTYzNTYyMDAwMiwiZXhwIjoxNjM2MjI0ODAyfQ.hUNBETw596S0-hgxvD3oAp5z_FGjMFin1sHIGSQSkcJN0uEq6EQXWqVouokpgw1e7lzeMnMVW2i9lV3rGmDqkA'
    }
  })
}

