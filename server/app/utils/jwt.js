'use strict';

const jwt = require('jsonwebtoken');

/**
 * token类
 */
class Jwt {
  constructor(data) {
    this.data = typeof data === 'object' ? JSON.stringify(data) : data;
  }
  /**
   * 生成token
   */
  async generateToken() {
    return new Promise(resolve => {
      resolve(jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          data: this.data,
        },
        'token'
      ));
    });
  }
  /**
   * 校验token
   */
  verifyToken() {
    return new Promise(resolve => {
      const data = jwt.verify(this.data, 'token')
      if (new Date(data.exp * 1000).getTime() < Date.now()){
        resolve('err');
      }
      resolve(data)
    });
  }
}

module.exports = Jwt;
