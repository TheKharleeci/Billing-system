import {Request, Response, NextFunction } from 'express'
import * as CustomerService from './customer.services';
import * as CustomerHelpers from '../../utils/helpers.hash';

   export const getCustomerAccount = async (req: Request, res: Response, next:NextFunction) => {
    try {        
      req.body.user = await CustomerService.getCustomer(req.body.email);
      return req.body.user
        ? next()
        : res
        .status(401)
        .json({ status: 'fail', message: 'Incorrect login details' });
    } catch (e) {
        return res
        .status(500)
        .json({ status: 'fail', message: 'Something went wrong' });
    }
  }

  export const comparePassword = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const {
            body: { password, user}, 
          } = req;
          const passwordValid = await CustomerHelpers.comparePassword(password, user.password);
        if (passwordValid) {
            return next();
        }
        return res
          .status(401)
          .json({ status: 'fail', message: 'Incorrect login details' });
    } catch (e) {
        return res
        .status(500)
        .json({ status: 'fail', message: 'Something went wrong' });
    }
  }
