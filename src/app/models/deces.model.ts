import { Category } from "./category.model";

export interface Deces {
    id: number;
    partner_id: string;
    category: Category[];
}