'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const checkTokenhandler = middleware.checkTokenhandler();
  router.post('/api/admin/login', controller.admin.login);
  router.get('/api/admin/user/info', checkTokenhandler, controller.admin.userInfo);
  router.post('/api/admin/logout', checkTokenhandler, controller.admin.logout);
  router.get('/api/admin/article/list', checkTokenhandler, controller.admin.articleList);
  router.get('/api/admin/article/info/:Id', checkTokenhandler, controller.admin.info);
  router.post('/api/admin/article/edit', checkTokenhandler, controller.admin.edit);
  router.post('/api/admin/article/status', checkTokenhandler, controller.admin.status);
  router.get('/api/admin/config/list', checkTokenhandler, controller.admin.configList);
  router.get('/api/admin/qiniu/uptoken', checkTokenhandler, controller.admin.uptoken);
  router.post('/api/admin/qiniu/url', checkTokenhandler, controller.admin.url);
  router.get('/api/admin/type/list', checkTokenhandler, controller.admin.typeList);
  router.get('/api/admin/tag/list', checkTokenhandler, controller.admin.tagList);
};
