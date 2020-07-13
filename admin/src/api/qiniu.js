import request from '@/utils/request'

export function uptoken(params) {
  return request({
    url: '/qiniu/uptoken',
    method: 'get',
    params
  })
}

export function url(data) {
  return request({
    url: '/qiniu/url',
    method: 'post',
    data
  })
}
