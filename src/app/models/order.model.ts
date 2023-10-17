export interface Order {
    id: number;
    order_date: string;
    time: string;
    appoi_time: string;
    shooting_type: string;
    partner_id: number;
    cust_name: string | null;
    cust_email: string | null;
    cust_phone: string | null;
    address: string | null;
    price: string;
    status: string;
    code: string;
}