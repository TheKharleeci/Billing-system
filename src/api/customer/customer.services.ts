import db from '../../db/setup';
import customerQueries from '../../db/queries/customer'

class CustomerService {
  private customer = customerQueries;

  /**
   * Fetchs a customer
   * @param data - email or id of the user
   * @returns - a customer data or null
   */
  public async getCustomer (data: string): Promise<string | null> {  
    return db.oneOrNone(this.customer.getCustomerAccount, [data]);
  };
}

export default CustomerService;