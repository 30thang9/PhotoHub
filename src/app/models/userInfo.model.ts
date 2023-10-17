import { TypeOfPhoto } from "./typeOfPhoto.model";

export interface UserInfo {
    id: number;
    user_id: number;
    img1: string;
    img2: string;
    img3: string;
    cost: number;
    description: string;
    prize: string;
    interest: string;
    language: string;
    camera: string;
    portfolio: [];
    typeOfPhoto: TypeOfPhoto[];
}
