import { validationResult } from 'express-validator';

const validateConnection = (req, res, next)=> {
  const validationError = validationResult(req);

  if (!validationError.isEmpty()) {
    const errorMsg = validationError.mapped();

    return res.status(401).redirect('sign-in');
    //   status: 400,
    //   message: 'Invalid input value',
    //   error: errorMsg,
    // });
  }
  return next();
};

export default validateConnection;