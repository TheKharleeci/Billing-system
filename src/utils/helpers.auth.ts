import jwt from 'jsonwebtoken';
import { ICustomerData } from './types/customer.interface';
import { IToken } from './types/token.interface';
import bcrypt from 'bcrypt'

export const createToken = (user: ICustomerData): string => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as jwt.Secret, {
        expiresIn: '10h'
    })
}

export const verifyToken = async (
    token: string
): Promise<jwt.VerifyErrors | IToken> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET as jwt.Secret, (err, payload) => {
            if (err) return reject(err);
            resolve(payload as IToken)
        })
    })
}

export const comparePassword = (plainPassword:string, hashedPassword: string): boolean => bcrypt.compareSync(plainPassword, hashedPassword)
