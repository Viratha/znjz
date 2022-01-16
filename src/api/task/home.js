import request from '@/utils/request'

export function home_bg(Author) {
    return request({
        url: '/sys/file/homebg',
        method: 'get',
        baseURL: 'http://123.56.83.121:8081/',

        headers: {
            'Authorization': Author
        }
        // params
    })
}
