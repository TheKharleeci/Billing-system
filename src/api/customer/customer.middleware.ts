import {Request, Response, NextFunction } from 'express'
import { Schema } from 'joi';
import CustomerService from './customer.services';
import { comparePassword } from '../../utils/helpers.auth';

class CustomerMiddleware {
  private CustomerService = new CustomerService();

  /**
   * Fetches a customer's account
   * @param email - the email of the user 
   * @returns - a next or an error 
   */
  public getCustomerAccount = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {        
      req.body.user = await this.CustomerService.getCustomer(req.body.email);
      return req.body.user
        ? next()
        : res
        .status(401)
        .json({ status: 'fail', message: 'Incorrect login details' });
    } catch (e) {
        res
        .status(500)
        .send(e);
    }
  }

  /**
   * Compares the password on the body with the password on the database
   * @param password - the inputed password 
   * @param userPassword - the password of the user 
   * @returns - a next or an error 
   */
  public checkPassword = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const {
            body: { password, user}, 
          } = req;
          const passwordValid = await comparePassword(password, user.password);
        if (passwordValid) {
            return next();
        }
        return res
          .status(401)
          .json({ status: 'fail', message: 'Incorrect login details' });
    } catch (e) {
        res
        .status(500)
        .send(e);
    }
  }
  
}

export default CustomerMiddleware;