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

export function articleEdit(data) {
  return request({
    url: '/article/edit',
    method: 'post',
    data
  })
}

export function articleStatus(data) {
  return request({
    url: '/article/status',
    method: 'post',
    data
  })
}
