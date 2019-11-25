import { create } from '../model/commentModel';


const commentCreate = {
  create(req, res) {
    //req.body.authorId = req.userData.id;
   // req.body.articleId = req.params.id;
    const newComent = create(req.body);
    console.log(newComent);
    req.session.amountRepayment = newComent.amount;
    req.session.createdOn = newComent.created_On;
    //req.session.accountid = newComent.id;
    req.session.ArticleId = newComent.ArticleId;
    return res.status(201).redirect('loan-details');
    //send({ status: 201, message: 'comment created', data: (newComent) });
  },
};

export default commentCreate;
