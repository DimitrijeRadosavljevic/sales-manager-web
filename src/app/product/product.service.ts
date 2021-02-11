import { ExpressResponse } from './../_shared/models/express-response';
import { BaseApiService } from './../_shared/services/base-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../_shared/models/product';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseApiService {

  public getProducts(perPage?: number | string, page?: number | string):Observable<ExpressResponse> {
    let params = new HttpParams();
      
    params = (perPage ? params.set('perPage', perPage.toString()) : params)

    params = (page ? params.set('page', page.toString()) : params);
    return this.http.get<ExpressResponse>(`${this.apiUrl}/products`, { params });
  }

  public getProduct(productId: string):Observable<ExpressResponse<Product>> {
    return this.http.get<ExpressResponse<Product>>(`${this.apiUrl}/products/${productId}`);
  }

  public postProduct(product: Product, image: File):Observable<ExpressResponse<Product>> {

    const productData = new FormData();
    console.log(image);
    productData.append("product", JSON.stringify(product));
    if(image != null ) {
      productData.append("image", image, product.name);
    }
    return this.http.post<ExpressResponse<Product>>(`${this.apiUrl}/products`, productData);
  }

  public deleteProduct(productId: string):Observable<ExpressResponse> {
    return this.http.delete<ExpressResponse>(`${this.apiUrl}/products/${productId}`);
  }

  public updateProduct(product: Product, image: File):Observable<ExpressResponse<Product>> {

    const productData = new FormData();
    console.log(image);
    productData.append("product", JSON.stringify(product));
    if(image != null ) {
      productData.append("image", image, product.name);
    }
    return this.http.put<ExpressResponse<Product>>(`${this.apiUrl}/products/${product._id}`, productData);
  }
}
