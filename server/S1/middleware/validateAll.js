import { validationResult } from 'express-validator';

const validateAll = (req, res, next)=> {
  const validationError = validationResult(req);

  if (!validationError.isEmpty()) {
    const errorMsg = validationError.mapped();

     return res.status(401).redirect('sign-up');
    //   status: 401,
    //   message: 'Invalid input value',
    //   error: errorMsg,
    // });
  }

  return next();
};

export default validateAll;
