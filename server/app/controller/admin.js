'use strict';

const Controller = require('egg').Controller;

const { setResult } = require('../utils');
const Jwt = require('../utils/jwt');
const BlogError = require('../utils/BlogError');
const { RESULT_FAIL } = require('../constants/result');

class LoginController extends Controller {
  /**
   * 登录
   */
  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    const user = await this.app.mysql.get('Admin', { Name: username, Password: password });
    if (!user) throw new BlogError(RESULT_FAIL, '用户名或密码错误');
    const token = await new Jwt(user).generateToken();
    ctx.body = setResult({ data: { token } });
  }
  /**
   * 获取用户信息
   */
  async userInfo() {
    const { ctx } = this;
    const token = ctx.query.token;
    const info = JSON.parse((await new Jwt(token).verifyToken()).data);
    ctx.body = setResult({ data: { name: info.Name, avatar: info.Avatar } });
  }
  /**
   * 登出
   */
  async logout() {
    const { ctx } = this;
    ctx.body = setResult();
  }
  /**
   * 文章列表
   */
  async articleList() {
    const { ctx } = this;
    const { page = 1, size = 20 } = ctx.query;
    const limit = parseInt(size),
      offset = parseInt(page - 1) * parseInt(size);
    const [ list, total ] = await Promise.all([
      this.app.mysql.select('Article', {
        columns: ['Id', 'Title', 'Summary', 'ViewCount', 'CreatedTime'],
        orders: [['CreatedTime','desc']],
        limit,
        offset,
      }),
      this.app.mysql.count('Article'),
    ]);
    ctx.body = setResult({ data: { list, total } });
  }
  /**
   * 文章详情
   */
  async info() {
    const { ctx } = this;
    const info = await ctx.app.mysql.get('Article', { Id: ctx.params.Id }, {
      columns: ['Id', 'Title', 'Summary', 'Content', 'ViewCount'],
    });
    ctx.body = setResult({ data: { info } });
  }
}

module.exports = LoginController;
