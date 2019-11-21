const jwt = require('jsonwebtoken');
const moment = require('moment');

let secret = '/#escom/#2019/#key/#secret/#token'

exports.createToken = function(user) {
  let payload ={
    sub: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    // iat: moment().unix(),
    // exp: moment().add(30, 'days').unix()
  }
  return jwt.sign(payload, secret)
}