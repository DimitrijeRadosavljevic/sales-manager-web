import { ReportListPerProductComponent } from './report-list-per-product/report-list-per-product.component';
import { ReportListComponent } from './report-list/report-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ReportListPerProductComponent
  },
  {
    path: '',
    component: ReportListPerProductComponent
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
