import { db } from '../../db/setup';
import { BillingRecord, BillingData} from "../../utils/types/billing.interface";
import BillingQueries from '../../db/queries/billing'


export const createRecord = async (data: BillingData): Promise<BillingRecord> => {  
  return db.one(BillingQueries.createBillingRecord, [data.customer_id, data.amount ]);
};
