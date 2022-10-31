import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth'
var count = 0

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: 'http://47.106.183.36:8081/', // url = base url + request url

  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60 * 1000 // request timeout
})

// const service2 = axios.create({
//   // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
//   baseURL: 'http://47.106.183.36:8081/', // url = base url + request url

//   // withCredentials: true, // send cookies when cross-domain requests
//   timeout: 5000 // request timeout
// })

// service2.interceptors.request.use(
//   config => {
//     // do something before request is sent
//     console.log('正在拦截http://47.106.183.36:8081/')
//     console.log(config.headers.Authorization)
//     localStorage.setItem('Authorization', config.headers.Authorization)
//     // localStorage.setItem('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTYzNTY2NTg2MiwiZXhwIjoxNjM2MjcwNjYyfQ.-0kGRpxxbDZp-qkjttP-xLFeGkRAu-DOtwn18uLGClPQkkT7WqlUaxxsGqgSCVQNPecENGdFWje7dseTkLUtvA')

//     if (store.getters.token) {
//       // let each request carry token
//       // [''] is a custom headers key
//       // please modify it according to the actual situation
//       // config.headers['X-Token'] = getToken()
//     }
//     return config
//   },
//   error => {
//     // do something with request error
//     console.log(error) // for debug
//     return Promise.reject(error)
//   }
// )
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // alert('正在拦截' + process.env.VUE_APP_BASE_API)
    // console.log('我他妈的是请求头' + JSON.stringify(config.headers.Authorization))
    if (JSON.stringify(config.headers.Authorization) !== undefined) {
      // console.log('我没头')
    } else {
      // console.log('我他妈有请求头' + JSON.stringify(config.headers.Authorization))
      var auther = config.headers.authorization
      localStorage.setItem('Authorization', auther)
    }
    // if (JSON.stringify(config.headers.Authorization) !== 'undefined' && count > 2) {
    //   localStorage.setItem('Authorization', config.headers.Authorization)
    // }
    // var test = localStorage.getItem('count')
    // if (test === 'undefined') { console.log('test:' + test) }
    // console.log('test请求:' + test)
    // var auther = config.headers.Authorization
    // if (test === 1) {
    //   localStorage.setItem('Authorization', auther)
    //   localStorage.setItem('count', 2)
    // }

    // console.log('config.headers' + JSON.stringify(config))

    // console.log(config.headers.Authorization)
    // localStorage.setItem('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTYzNTY2NTg2MiwiZXhwIjoxNjM2MjcwNjYyfQ.-0kGRpxxbDZp-qkjttP-xLFeGkRAu-DOtwn18uLGClPQkkT7WqlUaxxsGqgSCVQNPecENGdFWje7dseTkLUtvA')

    if (store.getters.token) {
      // let each request carry token
      // [''] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
    }

    return config
  },
  error => {
    // do something with request error
    console.log(error + '我是error') // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // console.log('我他妈的是响应头' + JSON.stringify(response.headers.authorization))
    if (JSON.stringify(response.headers.authorization) === undefined) {
      // console.log('我没响应头')
    } else {
      // console.log('我他妈有响应头' + JSON.stringify(response.headers.authorization))
      var auther = response.headers.authorization
      localStorage.setItem('Authorization', auther)
    }

    // var reg = new RegExp('"', 'g')
    // auther = auther.replace(reg, '')
    // console.log('我他妈的是auther' + auther)
    if (JSON.stringify(response.headers.authorization) === 'undefined' && count !== 1) { count = 99 } else { count = count + 1 }
    // 妈的
    // var test = localStorage.getItem('count')
    // console.log('count响应:' + count)
    if (count === 2) {
      // localStorage.setItem('Authorization', auther)

      // console.log('count响应++:' + count)
    }

    if (res.type === 'text/xml') return res

    if (res.code === '-1') {
      Message({
        message: res.message || 'Error',
        type: 'error'
      })
    }

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== '200') {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
