import { Router } from 'express';
import CustomerController from './customer.controllers';
import CustomerMiddleware from './customer.middleware';
import { loginSchema } from '../../utils/schema';
import { validateBodyPayload } from '../../utils/generic.middleware';

const router = Router();
const customerController = new CustomerController();
const customerMiddleware = new CustomerMiddleware();


router.post(
  '/login',
  validateBodyPayload(loginSchema),
  customerMiddleware.getCustomerAccount,
  customerMiddleware.checkPassword,
  customerController.login
);

export default router;
