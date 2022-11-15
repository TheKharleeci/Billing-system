export interface BillingData {
    amount: number;
    customer_id: string;
};

export interface BillingRecord extends BillingData{
    id: string;
    status: string;
};