'use strict';

const Controller = require('egg').Controller;

const { setResult } = require('../utils');
const Jwt = require('../utils/jwt');

class LoginController extends Controller {
  /**
   * 登录
   */
  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    const user = await this.app.mysql.get('Admin', { Name: username, Password: password });
    const token = new Jwt(user).generateToken();
    ctx.body = setResult({ data: { token } });
  }
}

module.exports = LoginController;
