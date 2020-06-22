'use strict';

const Jwt = require('./utils/jwt');

const jwt = new Jwt({ user: 1, password: 2 });

jwt.generateToken().then(token => {
  console.log(token)
  const jwt1 = new Jwt(token);
  jwt1.verifyToken().then(data => {
    console.log(data)
  })
});
