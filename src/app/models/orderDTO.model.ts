import { Order } from "./order.model";
import { User } from "./user.model";

export interface OrderDTO {
    order: Order;
    user: User;
}