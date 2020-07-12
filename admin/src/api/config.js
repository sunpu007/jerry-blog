import request from '@/utils/request'

export function configList(params) {
  return request({
    url: '/config/list',
    method: 'get',
    params
  })
}
