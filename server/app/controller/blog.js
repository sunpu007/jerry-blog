'use strict';

const Controller = require('egg').Controller;

const { setResult } = require('../utils');

class ArticleController extends Controller {
  /**
   * 获取文章列表
   */
  async list() {
    const { ctx } = this;
    const list = await ctx.app.mysql.select('Article', {
      orders: [['CreatedTime','desc']]
    });
    ctx.body = setResult({ data: { list } });
  }
}

module.exports = ArticleController;
