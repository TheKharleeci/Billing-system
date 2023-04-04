import {Request, Response } from 'express'
import BillingService from './billing.services';
import { publishToQueue } from './rabbit.setup'
import 'dotenv/config';

class BillingController {

  private BillingService = new BillingService();

  public billCustomer = async (req: Request, res: Response ): Promise<Response | void> => {
    try {
        const { amount , data: { id : customer_id }} = req.body;        
        const record= await this.BillingService.createRecord(customer_id, amount, );
        const queuePayload = JSON.stringify({ transactionId: record?.id})
        publishToQueue(process.env.QUEUE_NAME!, queuePayload)
        return res
          .status(201)
          .json({ status: 'success', message: 'Billing request created successfully', data: record });
    } catch (e) {
        res
        .status(500)
        .send(e);
    }
  }
}

export default BillingController;