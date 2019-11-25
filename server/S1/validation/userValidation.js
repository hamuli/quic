import  Joi  from '@hapi/joi';

// userCreation validation 
export default class validate{
static userCreationValidation(data){
        const schema= Joi.object().keys({
             firstName: Joi.string().alphanum().min(3).max(12).required(),
             lastName:Joi.string().alphanum().min(3).max(30).required(),
             password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
             email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','org','rw'] } }),
             gender:Joi.string().max(4).required(),
             jobRole:Joi.string().alphanum().min(3).max(10).required(),
             departement:Joi.string().alphanum().min(3).max(10).required(),
             address:Joi.string().alphanum().min(3).max(30).required(),
      });
      return Joi.validate(data, schema);
 }

}
module.exports= validate;
