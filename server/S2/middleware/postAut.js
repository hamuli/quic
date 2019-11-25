import jwt from 'jsonwebtoken';

require('dotenv').config();

const { SECRET } = process.env;

const checkToken = (req, res, next)=> {
  let token = req.header('auth-token');

  if (!token) return res.status(401).send({ status: 401, message: 'access denied' });
  try {
    let decoder = jwt.verify(token, SECRET);

    req.userData = decoder;
    next();
  } catch (error) {
    return res.status(401).send({ status: 401, error: 'invalid token' });
  }
};

export default checkToken;


