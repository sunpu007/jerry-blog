'use strict';

const crypto = require('crypto');

const { RESULT_SUCC } = require('./../constants/result');

/**
 * 接口统一返回格式
 * @param {*} data
 * code:Number 状态码
 * message:String 提示，code非RESULT_SUCC时必传
 * data:Object 返回数据
 */
const setResult = function(data) {
  console.log('============>', data);
  return {
    code: (data && data.code) || RESULT_SUCC,
    message: (data && data.message) || 'success',
    data: data && data.data,
  };
};

/**
 * 判断是否为空
 * @param {*} val 需要校验的值
 */
const isEmpty = val => {
  if (val === undefined || val === null || (typeof val === 'string' && val.trim() === '')) {
    return true;
  }
  return false;
};

/**
 * MD5加密
 * @param {*} val 待加密字符串
 */
const md5 = val => {
  const m = crypto.createHash('md5');
  m.update(str, 'utf8');
  return m.digest('hex').toUpperCase();
}

module.exports = {
  setResult,
  isEmpty,
  md5
};
