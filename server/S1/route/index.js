import { Router } from 'express';
// import UserValidation from '../middleware/createValidation'
import userValid from '../middleware/userValid';
import validateAll from '../middleware/validateAll';
import validateConnection from '../middleware/connectValid';
import validationsConnection from '../middleware/connectMidd';
import postValidation from '../middleware/postAut';
import userController from '../controller/userController';
import postController from '../controller/postController';
//import postChecker from '../middleware/postValidation';
import session from 'express-session';


import commentController from '../controller/commentController';

import ErrorHandler from '../middleware/errorHandler';

const router = new Router();
require('dotenv').config();
router.use(session({
  secret: 'mysecretttttt',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

router.post('/sign-up', userValid, validateAll, userController.create);
router.get('/dashboard', (req, res)=> {
   let amount =  req.session.amount
   let createdOn= req.session.createdOn 
   let interest= amount*10/100;
   let total= Number(amount)+Number(interest);
   console.log(total)
   let accountId= req.session.accountId;
   let repayment = req.session.amountRepayment;
   let balance= Number(total)-Number(repayment);
   let type= req.session.type
   let bank= req.session.bank
   let periode =req.session.periode
  res.render('dashboard',{userAmount:amount,balances:balance,userrepayment:repayment,totale:total,interests: interest,time:createdOn,userAccount:accountId,userType:type,userBank:bank,periodes:periode});
});
router.get('/loans', (req, res)=> {
  let type = req.session.type;
  let time= req.session.createdOn;
  res.render('loans' , {userType:type,userTime:time});
});
router.get('/loan-details', (req, res)=> {
  let amount =  req.session.amount
   let createdOn= req.session.createdOn 
   let interest= amount*10/100;
   let total= Number(amount)+Number(interest);
   
   let repayment = req.session.amountRepayment;
   let accountId= req.session.accountId;
    let userId=req.session.ArticleId;
    console.log('yeyeyeye');
    console.log(userId);
   let type= req.session.type;
   let periode =req.session.periode;
   let balance= Number(total)-Number(repayment);
   console.log(balance);
    console.log(repayment);
  res.render('loan-details',{userAmount:amount,balances:balance,userRepayment:repayment,totale:total,interests: interest,time:createdOn,userids:userId,userType:type,periodes:periode});
});
router.get('/admin-dashboard', (req, res)=> {
	let data = req.session.email;
	let createdOn= req.session.createdOn;
	let articleId= req.session.articleId
  res.render('admin-dashboard',{userData:data,time:createdOn,userArticle:articleId});
});
router.get('/users', (req, res)=> {
  res.render('users');
});
router.get('/reason', (req, res)=> {
  let reason = req.session.reason;
  res.render('reason', {reasons:reason});
});
router.get('/update-pending-applications', (req, res)=> {
  let amount =  req.session.amount
   let createdOn= req.session.createdOn 
   let interest= amount*10/100;
   let total= Number(amount)+Number(interest);
   console.log(total)
   let accountId= req.session.accountId
   let type= req.session.type
   let bank= req.session.bank
   let periode =req.session.periode
  res.render('update-pending-applications',{userAmount:amount,totale:total,interests: interest,time:createdOn,userAccount:accountId,userType:type,userBank:bank,periodes:periode});
});
router.post('/update-pending-applications',(req,res)=>{
  console.log('dddddd')
  let all = req.body.reason;
  req.session.reason = req.body.reason;
  res.render('update-pending-applications')
})
router.get('/sign-up', (req, res)=> {
  res.render('sign-up');
});
router.get('/sign-in', (req, res)=> {
  res.render('sign-in');
});
router.get('/index', (req, res)=> {
  res.render('index');
});
router.get('/request', (req, res)=> {
  let account = req.session.idAccount;
  let account1 = req.session.accountId;
 // if(account1){
    res.render('request',{newaccount:account});
 // }
  
});
router.get('/repayment', (req, res)=> {
  res.render('repayment');
});
router.get('/error', (req, res)=> {
  res.render('error');
});
router.post('/sign-in', validateConnection, validationsConnection, userController.connect);
router.post('/request',postController.create);
router.patch('/article/:id', postValidation, postController.edit);
router.delete('/delete/:id', postValidation, postController.delete);
router.get('/applications', postController.getAll);

router.get('/loan-details/:id', postController.viewSpecific);
router.post('/repayment',commentController.create);
// router.use(ErrorHandler);
//router.use(ErrorHandler);
export default router;
