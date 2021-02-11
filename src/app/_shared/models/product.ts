export class Product {
    _id: string;
    name: string; 
    code: string;
    dimensions: { x: number, y: number, z: number}
    color: string;
    imagePath: any;
    staffSalePrice: number;
    staffSaleType: number;
    quantity: number;
    homeDelivery: boolean;

}