import request from '@/utils/request'

export function articleList(params) {
  return request({
    url: '/article/list',
    method: 'get',
    params
  })
}
