import { BaseApiService } from './../_shared/services/base-api.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ExpressResponse } from '../_shared/models/express-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends BaseApiService{

  public fetchReportsPerProduct(perPage?: number | string, page?: number | string, filter?: string):Observable<ExpressResponse> {
    let params = new HttpParams();
      
    params = (perPage ? params.set('perPage', perPage.toString()) : params)

    params = (page ? params.set('page', page.toString()) : params);

    params = (filter ? params.set('filter', filter.toString()) : params);

    return this.http.get<ExpressResponse>(`${this.apiUrl}/reports/getReportsPerProduct`, { params });
  }

  public fetchReportsPerStaff(perPage?: number | string, page?: number | string, filter?: string):Observable<ExpressResponse> {
    let params = new HttpParams();
      
    params = (perPage ? params.set('perPage', perPage.toString()) : params)

    params = (page ? params.set('page', page.toString()) : params);

    params = (filter ? params.set('filter', filter.toString()) : params);

    return this.http.get<ExpressResponse>(`${this.apiUrl}/reports/getReportsPerStaff`, { params });
  }
}
