import { Role } from "./role.model";

export interface User {
    id: number;
    username: string;
    password: string;
    full_name: string;
    email: string;
    phone_number: string;
    address: string;
    avatar: string;
    role_id: number;
    role?: Role;
}