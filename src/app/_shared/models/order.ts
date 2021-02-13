import { cardItem } from "./cardItem";
import { userDetail } from "./userDetail";

export class Order {

    _id: string;
    userDetail:  userDetail
    chartItems: cardItem [];
    amount: number;
    status: boolean;
    createdBy: string;
    ownerId: string;
    date: Date;
}
