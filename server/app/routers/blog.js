'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/blog/init', controller.blog.init);
  router.get('/blog/article/list', controller.blog.list);
  router.get('/blog/article/info/:Id', controller.blog.info);
};
