import uuid from 'uuid';
import { hashPassword } from '../help/help';

export const userDb = [];
export const create = (data)=> {
  const newUser = {
    id: userDb.length + 1,
    email: data.email,
    password: hashPassword(data.password),
  };
  console.log(newUser);
  userDb.push(newUser);
  return newUser;
  console.log(newUser);
};

export const admin =(email)=> userDb.find((users)=>users[0].email === email);
export const findOneMail = (email)=> userDb.find((emails)=> emails.email === email);
export const findByPassword = (password)=> userDb.find((reflect)=> reflect.password === password);
