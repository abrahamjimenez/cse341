const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'defaultSecretKey';

exports.login = async (req, res) => {
  const userId = 'someUserId';

  const token = jwt.sign({userId}, secretKey, {expiresIn: '1h'});
  res.json({token});
};

exports.logout = async (req, res) => {
  res.removeHeader("Content-Type");
}