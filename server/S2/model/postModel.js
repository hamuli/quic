
import { commentDb } from './commentModel';

export const postDb = [];

export const create = (data)=> {
  const newpost = {
    articleId: postDb.length + 1,
    createdOn: new Date().toLocaleString(),
    amount: data.loanAmount,
    accountId:data.accountId,
    type: data.loanType,
    bank:data.bank_name,
    periode: data.Period,
  };
  postDb.push(newpost);
  return newpost;
};


// eslint-disable-next-line max-len
export const findOne = (ArticleId)=> postDb.find((OnePost)=> OnePost.articleId.toString() === ArticleId);

export const update = (ArticleId, data)=> {
  const index = parseInt(ArticleId);

  console.log(ArticleId);


  postDb[index - 1].amount = data.amount;

  postDb[index - 1].type = data.type;

  postDb[index - 1].periode = data.periode;
  return postDb[index - 1];
};
export const moveout = (ArticleId)=> {
  const oneId = findOne(ArticleId);
  const index = postDb.indexOf(oneId);

  postDb.splice(index, 1);
  return {};
};
export const viewSpecifics = (article)=> {
  // eslint-disable-next-line max-len
  article.comments = commentDb.filter((comment)=> parseInt(comment.ArticleId) === parseInt(article.ArticleId));
  return article;
};

export const getAll = ()=> postDb;


// https://www.pivotaltracker.com/services/v5/github_hooks/85353a405266a1d81b291501d982f6e1
// cc2e8b42e84e40354aa25a80102cf9bd9cadfe12