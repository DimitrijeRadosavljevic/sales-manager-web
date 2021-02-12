import { Injectable } from '@angular/core';
import {BaseApiService} from '../_shared/services/base-api.service';
import {Observable} from 'rxjs';
import {ExpressResponse} from '../_shared/models/express-response';
import {HttpParams} from '@angular/common/http';
import {Employee} from '../_shared/models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseApiService {

  public getEmployees(page?: number | string, perPage?: number | string, ): Observable<ExpressResponse> {
    let params = new HttpParams();

    params = (page ? params.set('page', page.toString()) : params);

    params = (perPage ? params.set('perPage', perPage.toString()) : params);

    return this.http.get<ExpressResponse>(`${this.apiUrl}/employees`, { params });
  }

  public getEmployee(employeeId: string): Observable<ExpressResponse<Employee>> {
    return this.http.get<ExpressResponse<Employee>>(`${this.apiUrl}/employees/${employeeId}`);
  }

  public postEmployee(employee: Employee): Observable<ExpressResponse<Employee>> {
    return this.http.post<ExpressResponse<Employee>>(`${this.apiUrl}/employees`, employee);
  }

  public putEmployee(employee: Employee): Observable<ExpressResponse<Employee>> {
    return this.http.put<ExpressResponse<Employee>>(`${this.apiUrl}/employees/${employee._id}`, employee);
  }

  public deleteEmployee(employeeId: string): Observable<ExpressResponse<null>> {
    return this.http.delete<ExpressResponse<null>>(`${this.apiUrl}/employees/${employeeId}`);
  }
}
