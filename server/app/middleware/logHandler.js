'use strict';

/**
 * 接口日志打印
 */
module.exports = () => {
  return async function logHandler(ctx, next) {
    const time = Date.now();
    await next();
    // eslint-disable-next-line no-unused-vars
    const { body, url, headers, method } = ctx.request;
    let infoStr = `url: ${url}, method: ${method}, `;
    infoStr += `params: ${JSON.stringify(body)}, resp: ${JSON.stringify(ctx.body)}, time: ${Date.now() - time}ms`;
    ctx.logger.info(infoStr);
  };
};
