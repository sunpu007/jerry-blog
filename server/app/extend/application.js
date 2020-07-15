'use strict';

const qiniu = require('qiniu')

const QI_NIU = Symbol('Application#qiniu');

module.exports = {
  get QINIU() {
    if (!this[QI_NIU]) {
      const qiniu_access_key = this.config.qiniu.qiniu_access_key,
        qiniu_secret_key = this.config.qiniu.qiniu_secret_key;
      this[QI_NIU] = {};
      // 获取上传凭证
      this[QI_NIU].createQiniuUpToken = () => {
        const mac = new qiniu.auth.digest.Mac(qiniu_access_key, qiniu_secret_key);
        const options = {
          scope: this.config.qiniu.qiniu_bucket_name,
          expires: 7200,
        };
        const putPolicy = new qiniu.rs.PutPolicy(options);
        return putPolicy.uploadToken(mac);
      };
      // 获取外链
      this[QI_NIU].createQiniuAccessLink = key => {
        return this.config.qiniu.qiniu_bucket_domain + key;
      };
      return this[QI_NIU];
    }
    return this[QI_NIU];
  },
};
