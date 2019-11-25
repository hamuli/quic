export const commentDb = [];
export const create = (data)=> {
  const newComment = {
    id: commentDb.length + 1,
    created_On: new Date().toLocaleString(),
    //AuthorId: data.authorId,
    ArticleId: data.ArticleId,
   // ArticleTitle: data.articleTitle,
    amount: data.amount,
   // article: data.article,
  };

  commentDb.push(newComment);
  return newComment;
};

