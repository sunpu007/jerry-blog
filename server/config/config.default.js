/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1586874967798_3835';

  // add your middleware config here
  config.middleware = [ 'logHandler', 'errorHandler' ];

  // add your user config here
  const userConfig = {
    myAppName: 'blog-server',
  };

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'blogdb',
      // 端口号
      port: '3306',
      // 用户名
      user: 'blog',
      // 密码
      password: 'blog2020',
      // 数据库名
      database: 'blog',
      // debug: true,
    },
  };

  // 配置日志
  config.logger = {
    dir: path.join(appInfo.baseDir, 'logs'),
  };

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ],
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  return {
    ...config,
    ...userConfig,
  };
};
