import request from '@/utils/request'

export function report(Author, username) {
    return request({
        url: '/sys/register/report?username=' + username,
        method: 'post',
        baseURL: 'http://123.56.83.121:8081/',
        headers: {
            'Authorization': Author
        }
        //params
    })
}


