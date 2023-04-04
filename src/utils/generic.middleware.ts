import {Request, Response, NextFunction } from 'express'
import { Schema } from 'joi';
import { verifyToken } from './helpers.auth';

export const validateBodyPayload = (schema: Schema) => async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const isValid = await schema.validate(req.body);
      if (!isValid.error) {
        return next();
      }
      const { message } = isValid.error.details[0];
      return res
      .status(400)
      .json({ status: 'fail', message: message.replace(/["]/gi, '') });
    } catch (e) {
      res
      .status(500)
      .send(e);
    }
  };

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token: string | undefined = req.headers.authorization?.split(
        " "
      )[1];
  
      if (!token) {
        return res.status(401).json({ msg: "You have to be logged in" });
      }
      const decoded = await verifyToken(token);
      req.body.data = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ msg: "You have to be logged in" });
    }
  };