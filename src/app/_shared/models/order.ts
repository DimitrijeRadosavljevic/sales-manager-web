import { Seller } from './user-seller';
import { cardItem } from "./cardItem";
import { userDetail } from "./userDetail";

export class Order {

    _id: string;
    userDetail:  userDetail
    chartItems: cardItem [];
    amount: number;
    status: boolean;
    seller: Seller
    ownerId: string;
    date: Date;
}
