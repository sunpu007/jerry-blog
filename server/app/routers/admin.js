'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/admin/login', controller.login.login);
  router.get('/api/admin/user/info', controller.login.userInfo);
  router.post('/api/admin/logout', controller.login.logout);
};
