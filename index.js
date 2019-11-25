// server.js
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
//import 'babel-polyfill';
//import ReflectionWithJsObject from './src/usingJSObject/controllers/Reflection';
import db from './src/usingDB/controllers/Reflection';

dotenv.config();
//const Reflection = process.env.TYPE === 'db' ? ReflectionWithDB : ReflectionWithJsObject;
const app = express()

app.use(express.json())
app.use(morgan('dev'));


app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)


app.get('/', (req, res) => {
  return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
});

app.listen(3000)
console.log('app running on port ', 3000);