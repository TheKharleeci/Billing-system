import { Router } from 'express';
import * as BillingController from './billing.controller'
import { authenticate } from '../../utils/helpers.auth'
import { validatePayload } from '../../utils/helpers.hash'
import { fundAccountSchema } from '../../utils/schema'

const router = Router();


router.post(
  '/fund',
  validatePayload(fundAccountSchema),
  authenticate,
  BillingController.billCustomer
);

export default router;
