import session from 'express-session';

import {
  create, findOne, moveout, getAll, update, viewSpecifics,
} from '../model/postModel';



const post = {
  create(req, res) {
    const newPost = create(req.body);
     //let amount = newPost.amount;   
     //req.session.amount=req.session;
     //return res.render('request',{mount:session.amount}) 
      //let mount = session.newPost;
      console.log('tttttt');
      console.log(newPost);
     req.session.amount= newPost.amount
     req.session.articleId = newPost.articleId
     req.session.createdOn = newPost.createdOn
     req.session.accountId = newPost.accountId
     req.session.type = newPost.type
     req.session.bank = newPost.bank
     req.session.periode = newPost.periode
    return res.render('request');

  },
  edit(req, res) {
    const findOneArticle = findOne(req.params.id);

    if (!findOneArticle) {
      return res.status(404).send({ status: 400, error: 'Article not found' });
    }
    // if (req.userData.id.toString() === Number(findOneArticle.authorId)) {
     const editOneArticle = update(findOneArticle.ArticleId, req.body);

    return res.status(200).send({ status: 200, message: 'post was updated succesfully', data: { editOneArticle } });
    // }
    // return res.status(401).send({ status: 401, error: 'you can not edit this post' });
  },

  delete(req, res) {
    req.body.authorId = req.userData.id.toString();
    const findOneId = findOne(req.params.id);

    if (!findOneId) {
      return res.status(404).send({ status: 404, error: 'not found' });
    }
    //if (req.userData.id === Number(findOneId.authorId)) {
      const mouveOutPost = moveout(req.params.id);

     return  res.status(200).send({ status: 204, message: 'article successfully deleted' });
    // eslint-disable-next-line brace-style
    },
    // eslint-disable-next-line no-lone-blocks
    // else {
    //   res.status(401).send({ status: 401, error: 'you can not  delete this post ' });
    // }
  viewSpecific(req, res) {
    const findOneId = findOne(req.params.id);

    if (!findOneId) {
        return res.status(401).redirect('loan-details');
     // return res.status(404).send({ status: 400, error: 'not found' });
    }
    let findOneIds = viewSpecifics(findOneId);
    console.log('yeyeyeyeyeyyeye');
    console.log(findOneId);
      return res.status(201).redirect('loan-details');
     // return res.status(200).send({ status: 200, message: 'pass', data: (findOneIds) });
  },
  getAll(req, res) {
    const get = getAll(req.params);
    //req.session.time=get.createdOn;
    let okey =get.bank;
  req.session.use= get;
  let user = req.session.use;
  console.log(user);
    let getUser = 
    req.session.amount= get.amount;
    let amount=req.session.amount
    req.session.accountId = get.accountId;
    let accountId=req.session.accountId
    req.session.type = get.type;
    let type=req.session.type
    req.session.bank = get.bank;
    let bank=req.session.bank
    req.session.periode = get.periode;
   let periode=req.session.periode
  let data = req.session.email;
  let createdOn= req.session.createdOn;
 let articleId= req.session.articleId
    //console.log('yyyyyyyyokey');
    //console.log(get);

    //"":"1000","accountId":"1","type":"SF","bank":"finca","periode":"1"
//     router.get('/', (req, res)=> {

    res.render('applications',{user:user,userData:data,time:createdOn,userArticle:articleId,userTime:createdOn,userAmount:amount,userAccountId:accountId,userType:type,userBank:bank,userPeriode:periode});
// });
console.log('uuuuiiiii');
console.log(user);

    // eslint-disable-next-line no-dupe-keys
    //return res.status(200).send({ status: 200, message: 'succes', data: (get) });
  },

}
export default post;


