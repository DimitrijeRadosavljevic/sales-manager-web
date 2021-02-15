import { BaseApiService } from './../_shared/services/base-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpressResponse } from '../_shared/models/express-response';
import { HttpParams } from '@angular/common/http';
import {Employee} from '../_shared/models/employee';
import {Order} from '../_shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseApiService {

  public fetchOrders(perPage?: number | string, page?: number | string,  filter?: string): Observable<ExpressResponse> {
    let params = new HttpParams();

    params = (perPage ? params.set('perPage', perPage.toString()) : params);

    params = (page ? params.set('page', page.toString()) : params);

    params = (filter ? params.set('filter', filter.toString()) : params);

    return this.http.get<ExpressResponse>(`${this.apiUrl}/orders`, { params });
  }

  public fetchOrder(orderId: string): Observable<ExpressResponse> {
    return this.http.get<ExpressResponse>(`${this.apiUrl}/orders/${orderId}`);
  }

  public postOrder(order): Observable<ExpressResponse<Order>> {
    return this.http.post<ExpressResponse<Order>>(`${this.apiUrl}/orders`, order);
  }

  public fetchSellerOrders(perPage?: number | string, page?: number | string, filter?: string): Observable<ExpressResponse> {
    let params = new HttpParams();

    params = (perPage ? params.set('perPage', perPage.toString()) : params);

    params = (page ? params.set('page', page.toString()) : params);

    params = (filter ? params.set('filter', filter.toString()) : params);

    return this.http.get<ExpressResponse>(`${this.apiUrl}/orders/seller`, { params });
  }

  public updateOrderStatus(order: Order): Observable<ExpressResponse> {
    const newStatus: boolean = !order.status;
    return this.http.patch<ExpressResponse>(`${this.apiUrl}/orders/${order._id}`, { newStatus });
  }
}
