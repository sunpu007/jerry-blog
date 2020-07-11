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
      where: { Status: 0 },
      columns: ['Id', 'Title', 'Summary', 'ViewCount', 'CreatedTime'],
      orders: [['CreatedTime','desc']]
    });
    ctx.body = setResult({ data: { list } });
  }
  /**
   * 获取文章详情
   */
  async info() {
    const { ctx } = this;
    const [ info ] = await Promise.all([
      ctx.app.mysql.get('Article', { Id: ctx.params.Id }, {
        columns: ['Id', 'Title', 'Summary', 'Content', 'ViewCount', 'CreatedTime'],
      }),
      ctx.app.mysql.query('UPDATE Article SET ViewCount = ViewCount + 1 WHERE Id = ?', [ ctx.params.Id ]),
    ])
    ctx.body = setResult({ data: { info } });
  }
}

module.exports = ArticleController;
