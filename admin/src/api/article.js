import request from '@/utils/request'

export function articleList(params) {
  return request({
    url: '/article/list',
    method: 'get',
    params
  })
}

export function articleInfo(Id) {
  return request({
    url: `/article/info/${Id}`,
    method: 'get'
  })
}
