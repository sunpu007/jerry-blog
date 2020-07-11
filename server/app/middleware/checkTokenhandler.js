'use strict';

const Jwt = require('../utils/jwt');
const BlogError = require('../utils/BlogError');

const { RESULT_LOGIN_FAIL } = require('../constants/result');

module.exports = () => {
  return async function checkTokenhandler(ctx, next) {
    const token = ctx.request.headers.token;
    const result = await new Jwt(token).verifyToken();
    if (result === 'err') throw new BlogError(RESULT_LOGIN_FAIL, '登录已过期,请重新登录');
    await next();
  };
};
