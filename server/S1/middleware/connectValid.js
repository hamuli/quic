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
    .withMessage('password address is required')
    .isLength({ min: 6 })
    .withMessage('must be at least 6 characters long')
    .matches('[0-9]')
    .withMessage('must be at least  have a number'),
];
