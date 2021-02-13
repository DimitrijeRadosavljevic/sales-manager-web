import { ReportRoutingModule } from './report-routing.module';
import { NgModule } from '@angular/core';
import { ReportListComponent } from './report-list/report-list.component';
import { SharedModule } from '../_shared/shared.module';
import { ReportListPerStaffComponent } from './report-list-per-staff/report-list-per-staff.component';
import { ReportListPerProductComponent } from './report-list-per-product/report-list-per-product.component';



@NgModule({
  declarations: [ReportListComponent, ReportListPerStaffComponent, ReportListPerProductComponent],
  imports: [
    SharedModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
