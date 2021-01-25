import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../_shared/shared.module';
import {AuthRoutingModule} from './auth-routing.module';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
