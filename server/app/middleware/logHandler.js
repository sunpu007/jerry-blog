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
    infoStr += `params: ${JSON.stringify(body)}`;
    if (JSON.stringify(ctx.body).length > 100) {
      infoStr += `, resp: ${JSON.stringify(ctx.body).substring(0, 100)}`;
    } else {
      infoStr += `, resp: ${JSON.stringify(ctx.body)}`;
    }
    infoStr += `, time: ${Date.now() - time}ms`;
    ctx.logger.info(infoStr);
  };
};
