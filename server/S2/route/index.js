import express from 'express';
import authController from '../controller/userController';



const routes = express.Router();

routes.post('/auth/signup',authController.create)


export default routes;