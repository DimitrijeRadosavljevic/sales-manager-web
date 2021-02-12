import { OrderRoutingModule } from './order-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { SharedModule } from '../_shared/shared.module';



@NgModule({
  declarations: [OrderListComponent, OrderDetailComponent],
  imports: [
    SharedModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
