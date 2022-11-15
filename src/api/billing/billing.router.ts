import { Router } from 'express';
import * as BillingController from './billing.controller'
const router = Router();
import { authenticate } from '../../utils/helpers.auth'

router.post(
  '/fund',
  authenticate,
  BillingController.billCustomer
);

export default router;
