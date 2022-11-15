export default {
    getCustomerAccount: `
    SELECT id, first_name, last_name, email, password, salt
       FROM customer_info WHERE LOWER(TRIM(email)) = LOWER(TRIM($1));
   `,
  
};