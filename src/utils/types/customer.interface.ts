export interface CustomerData {
    id: string;
    first_name: string;
    last_name: string;
    email: string
}

export interface Customer extends CustomerData{
    password: string;
    salt: string;
};

export interface LoginResponse extends CustomerData{
    token: string;
}