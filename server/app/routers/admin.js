'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/admin/login', controller.admin.login);
  router.get('/api/admin/user/info', controller.admin.userInfo);
  router.post('/api/admin/logout', controller.admin.logout);
  router.get('/api/admin/article/list', controller.admin.articleList);
  router.get('/api/admin/article/info/:Id', controller.admin.info);
};
