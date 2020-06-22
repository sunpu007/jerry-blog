'use strict';

const Controller = require('egg').Controller;

const { setResult } = require('../utils');

class LoginController extends Controller {
  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    const user = await this.app.mysql.get('Admin', { Name: username, Password: password });
    ctx.body = setResult({ data: { user } });
  }
}

module.exports = LoginController;
