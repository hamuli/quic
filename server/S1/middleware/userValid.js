import { check } from 'express-validator';

export default [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Email address is required')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email address'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Password must be between 8 and 15 characters long')
    .matches('[0-9]')
    .withMessage('must be at least  have a number'),
];

