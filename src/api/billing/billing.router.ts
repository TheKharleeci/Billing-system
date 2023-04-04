import { Router } from 'express';
import BillingController from './billing.controller';
import { authenticate, validateBodyPayload } from '../../utils/generic.middleware';
import { fundAccountSchema } from '../../utils/schema'

const router = Router();
const billingController = new BillingController();


router.post(
  '/fund',
  validateBodyPayload(fundAccountSchema),
  authenticate,
  billingController.billCustomer
);

export default router;
