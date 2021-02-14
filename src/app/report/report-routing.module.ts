import { ReportListPerStaffComponent } from './report-list-per-staff/report-list-per-staff.component';
import { ReportListPerProductComponent } from './report-list-per-product/report-list-per-product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ReportListPerProductComponent
  },
  {
    path: 'reportsPerStaff',
    component: ReportListPerStaffComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ReportRoutingModule { }
