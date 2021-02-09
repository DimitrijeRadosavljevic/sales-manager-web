import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';

import { WorkComponent } from './work/work.component';
import {SellerRoutingModule} from './seller-routing.module';



@NgModule({
  declarations: [WorkComponent],
  imports: [
    SharedModule,

    SellerRoutingModule
  ]
})
export class SellerModule { }
