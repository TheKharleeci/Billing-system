import { db } from '../../db/setup';
import { Customer } from "../../utils/types/customer.interface";
import UserQueries from '../../db/queries/customer'

export const getCustomer = async (data: string): Promise<Customer | null> => {  
  return db.oneOrNone(UserQueries.getCustomerAccount, [data]);
};
