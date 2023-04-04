import {Request, Response } from 'express'
import { createToken } from '../../utils/helpers.auth';

class CustomerController {
  /**
   * Signs in the customer
   * @param req 
   * @param res 
   * @returns - a token or an error
   */
  public login = async (req: Request, res: Response ): Promise<Response |void> => {
    try {
        const {
           password, salt, ...userData 
          } = req.body.user;
        const token = createToken(userData);
        return res
          .status(200)
          .json({ status: 'success', message: 'Login successful', data: { ...userData, token} });
    } catch (e) {
        res
        .status(500)
        .send(e);
    }
  }
}

export default CustomerController;