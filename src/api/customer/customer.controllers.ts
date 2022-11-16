import {Request, Response } from 'express'
import * as CustomerHelpers from '../../utils/helpers.hash';
import { logger } from '../../utils/helpers.hash';

  export const login = async (req: Request, res: Response )=> {
    try {
        const {
           password, salt, ...userData 
          } = req.body.user;
        const token = CustomerHelpers.addDataToToken(userData);
        return res
          .status(200)
          .json({ status: 'success', message: 'Login successful', data: { ...userData, token} });
    } catch (e) {
        logger.error(e);     
        return res
        .status(500)
        .json({ status: 'fail', message: 'Something went wrong' });
    }
  }