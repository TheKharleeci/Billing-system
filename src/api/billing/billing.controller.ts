import {Request, Response } from 'express'
import { v4 as uuid } from 'uuid';
import * as BillingService from './billing.services';
import { publishToQueue } from './rabbit.setup'
import config from '../../config/setup'
import { logger } from '../../utils/helpers.hash';
  export const billCustomer = async (req: Request, res: Response ) => {
    try {
        const { amount, data: { id : customer_id }} = req.body;        
        const record = await BillingService.createRecord({ amount, customer_id });
        const queuePayload = JSON.stringify({ transactionId: record.id})
        publishToQueue(config?.QUEUE_NAME!, queuePayload)
        return res
          .status(201)
          .json({ status: 'success', message: 'Billing request created successfully', data: record });
    } catch (e) {
        logger.error(e);     
        return res
        .status(500)
        .json({ status: 'fail', message: 'Something went wrong' });
    }
  }