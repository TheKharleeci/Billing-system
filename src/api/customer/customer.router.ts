import { Router } from 'express';
import * as CustomerMiddleware from './customer.middleware'
import * as CustomerController from './customer.controllers'
import { validatePayload } from '../../utils/helpers.hash'
import { loginSchema } from '../../utils/schema'
const router = Router();


router.post(
  '/login',
  validatePayload(loginSchema),
  CustomerMiddleware.getCustomerAccount,
  CustomerMiddleware.comparePassword,
  CustomerController.login
);

export default router;
