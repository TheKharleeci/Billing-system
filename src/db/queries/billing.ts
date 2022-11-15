export default {
    createBillingRecord: `
    INSERT INTO billing_info (customer_id, amount) VALUES ( $1, $2) RETURNING *   
   `,

   updateBillingRecord: `
        UPDATE billing_info SET status = 'success'
        WHERE id = $1
  `,
  
};