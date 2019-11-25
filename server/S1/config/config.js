require('dotenv').config();

const { JWT_SECRET } = process.env;


const config = {
  jwtSecret: JWT_SECRET,
};

export default config;
