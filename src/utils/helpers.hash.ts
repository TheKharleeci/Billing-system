import 'dotenv/config';
import jwt, { Secret } from 'jsonwebtoken'
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs'
import { CustomerData } from './types/customer.interface'
import config from '../config/setup';
import { Request, Response, NextFunction } from "express";
import { Schema } from 'joi';
import SimpleNodeLogger from 'simple-node-logger';

export const salt: string = bcrypt.genSaltSync(10);

export const hashPassword = (password: string): string => bcrypt.hashSync(password, salt);

export const comparePassword = (plainPassword:string, hashedPassword: string): boolean => (
  bcrypt.compareSync(plainPassword, hashedPassword)
);

export const generateUUID = ():string => uuid();

export const jwtSecret: Secret = config?.AUTHENTICATION_SECRET!;


export const addDataToToken = (data: CustomerData): string => jwt.sign(data, jwtSecret, { expiresIn: '1h' });
export const verifyToken = (token: string) => jwt.verify(token, jwtSecret);

export const validateInput = (schema: Schema, object:object) => {
  return schema.validate(object);
}

export const validatePayload = (schema: Schema) => async (req: Request, res: Response, next:NextFunction) => {
    try {
      const isValid = await validateInput(schema, req.body);
      if (!isValid.error) {
        return next();
      }
      const { message } = isValid.error.details[0];
      return res
      .status(400)
      .json({ status: 'fail', message: message.replace(/["]/gi, '') });
    } catch (error) {
      logger.error(error);
    }
  };

export const logger = SimpleNodeLogger.createSimpleLogger( );