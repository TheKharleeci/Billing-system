import { Request, Response, NextFunction } from "express";
import { verifyToken } from './helpers.hash'
export const authenticate = (
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
    const decoded = verifyToken(token);
    req.body.data = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "You have to be logged in" });
  }
};