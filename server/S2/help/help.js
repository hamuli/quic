import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

require('dotenv').config();
// import dotenv from 'dotenv';
export const hashPassword = (password)=> bcrypt.hashSync(password, 10);
export const comparePasswords = (plain, encrypted)=> bcrypt.compareSync(plain, encrypted);
// export const authenticateUser = (email, id)=> {
//   const { SECRET } = process.env;

//   return jwt.sign({
//     email,
//     id,
//   },
//   SECRET, { expiresIn: 3600 }); // expires in an hour
// };
// export const removeUnexpect = (expect_input, inputData)=> {
//   const input_keys = Object.keys(inputData);
//   const filtered_input = {};

//   input_keys.forEach((key)=> {
//     if (expect_input.includes(key)) {
//       filtered_input[key] = inputData[key];
//     }
//   });
//   return filtered_input;
//};