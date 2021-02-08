import { ExpressResponse } from './../_shared/models/express-response';
import { BaseApiService } from './../_shared/services/base-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../_shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseApiService {

  public getProducts():Observable<ExpressResponse<Product[]>> {
    return this.http.get<ExpressResponse<Product[]>>(`${this.apiUrl}/products`);
  }

  public getProduct(productId: string):Observable<ExpressResponse<Product>> {
    return this.http.get<ExpressResponse<Product>>(`${this.apiUrl}/products/${productId}`);
  }

  public postProduct(product: Product, image: File):Observable<ExpressResponse<Product>> {
    const productData = new FormData();
    productData.append("product", JSON.stringify(product));
    productData.append("image", image, product.name);
    return this.http.post<ExpressResponse<Product>>(`${this.apiUrl}/products`, productData);
  }
}
