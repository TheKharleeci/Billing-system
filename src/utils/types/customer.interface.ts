export interface ICustomerData {
    id: string;
    first_name: string;
    last_name: string;
    email: string
}

export interface ICustomer extends ICustomerData{
    password: string;
    salt: string;
};