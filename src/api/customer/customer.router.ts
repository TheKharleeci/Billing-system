import { Router } from 'express';
import * as CustomerMiddleware from './customer.middleware'
import * as CustomerController from './customer.controllers'
const router = Router();


router.post(
  '/login',
  CustomerMiddleware.getCustomerAccount,
  CustomerMiddleware.comparePassword,
  CustomerController.login
);

export default router;
