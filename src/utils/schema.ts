import Joi from 'joi';


export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

export const fundAccountSchema = Joi.object({
    amount: Joi.number().min(1).max(10000000000).required()
  });