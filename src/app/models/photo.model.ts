export interface Photo {
    id: number;
    user_id: number;
    title: string;
    description: string;
    image_url: string;
    upload_date: Date;
    location: string;
}