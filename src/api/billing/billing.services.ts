import db from '../../db/setup';
import BillingQueries from '../../db/queries/billing';
import { BillingRecord } from '../../utils/types/billing.interface';

class BillingService {

  private billing = BillingQueries;

  public async createRecord (customer_id: string, amount: number): Promise<BillingRecord | null>{  
    return db.oneOrNone(this.billing.createBillingRecord, [customer_id, amount ]);
  };
}

export default BillingService;