'use strict';

/**
 * 自定义异常
 * @param {*} code 异常状态吗
 * @param {*} msg 异常信息
 */
function BlogError(code, msg) {
  this.code = code;
  this.message = msg;
}
BlogError.prototype = Object.create(Error.prototype);
BlogError.prototype.constructor = BlogError;

module.exports = BlogError;
