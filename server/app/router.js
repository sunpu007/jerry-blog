'use strict';

const fs = require('fs');
const path = require('path');

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  /**
   * 动态注册路由文件
   */
  const routerPath = path.join(__dirname, 'routers');
  fs.readdirSync(routerPath).forEach(dir => {
    require(path.join(routerPath, dir))(app);
  });
};
