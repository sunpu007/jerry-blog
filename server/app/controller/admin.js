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
      // this.app.mysql.select('Article', {
      this.app.mysql.query(`SELECT Article.Id Id, Article.Title Title, Article.Summary Summary, Article.ViewCount ViewCount, Article.Status Status,
        Article.CreatedTime CreatedTime, Article.UpdatedTime UpdatedTime, Article.Tags Tags, Type.TypeName TypeName FROM Article, Type WHERE
        Article.TypeId = Type.Id ORDER BY Article.CreatedTime DESC LIMIT ?,?`, [ offset, limit ]),
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
      columns: [ 'Id', 'Title', 'Summary', 'Content', 'ViewCount', 'Tags', 'TypeId' ],
    });
    info.Tags = info.Tags ? JSON.parse(info.Tags) : [];
    ctx.body = setResult({ data: { info } });
  }
  /**
   * 编辑文章
   */
  async edit() {
    const { ctx } = this;
    const body = ctx.request.body;
    let result;
    // 判断新增或编辑
    if (body.Id) {
      // 编辑
      result = await ctx.app.mysql.update('Article', {
        Title: body.Title,
        Summary: body.Summary,
        Content: body.Content,
        TypeId: body.TypeId,
        Tags: JSON.stringify(body.Tags),
        UpdatedTime: new Date()
      }, {
        where: { Id: body.Id },
      });
    } else {
      // 新增
      result = await ctx.app.mysql.insert('Article', {
        Title: body.Title,
        Summary: body.Summary,
        Content: body.Content,
        TypeId: body.TypeId,
        Tags: JSON.stringify(body.Tags),
      })
    }
    if (result.affectedRows !== 1) throw new BlogError(RESULT_FAIL, '保存失败，请稍后重试');
    ctx.body = setResult();
  }
  /**
   * 更新文章状态
   */
  async status() {
    const { ctx } = this;
    const { Id, Status } = ctx.request.body;
    const result = await ctx.app.mysql.update('Article', { Status }, { where: { Id } });
    const message = Status === -1 ? '删除失败' : Status === 0 ? '发布失败' : '下架失败'
    if (result.affectedRows !== 1) throw new BlogError(RESULT_FAIL, `${message}，请稍后重试`);
    ctx.body = setResult();
  }
  /**
   * 配置列表
   */
  async configList() {
    const { ctx } = this;
    const list = await ctx.app.mysql.select('SysConfig');
    ctx.body = setResult({ data: { list } });
  }
  /**
   * 获取七牛token
   */
  async uptoken() {
    const token = await this.app.QINIU.createQiniuUpToken();
    this.ctx.body = setResult({ data: { token } });
  }
  /**
   * 获取七牛外链
   */
  async url() {
    const { ctx } = this;
    const { key } = ctx.request.body;
    const url = await ctx.app.QINIU.createQiniuAccessLink(key);
    ctx.body = setResult({ data: { url } });
  }
  /**
   * 获取文章类别
   */
  async typeList() {
    const { ctx } = this;
    const list = await this.app.mysql.select('Type');
    ctx.body = setResult({ data: { list } });
  }
  /**
   * 获取标签
   */
  async tagList() {
    const { ctx } = this;
    const list = await this.app.mysql.select('Tag')
    ctx.body = setResult({ data: { list } });
  }
}

module.exports = LoginController;
