import 'dotenv/config';
import jwt, { Secret } from 'jsonwebtoken'
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs'
import { CustomerData } from './types/customer.interface'
import config from '../config/setup';

export const salt: string = bcrypt.genSaltSync(10);

export const hashPassword = (password: string): string => bcrypt.hashSync(password, salt);

export const comparePassword = (plainPassword:string, hashedPassword: string): boolean => (
  bcrypt.compareSync(plainPassword, hashedPassword)
);

export const generateUUID = ():string => uuid();

export const jwtSecret: Secret = config?.AUTHENTICATION_SECRET!;


export const addDataToToken = (data: CustomerData): string => jwt.sign(data, jwtSecret, { expiresIn: '1h' });
export const verifyToken = (token: string) => jwt.verify(token, jwtSecret);