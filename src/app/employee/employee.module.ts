import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';

import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeEditorComponent } from './employee-editor/employee-editor.component';

import { EmployeeRoutingModule } from './employee-routing.module';



@NgModule({
  declarations: [EmployeeListComponent, EmployeeEditorComponent],
  imports: [
    SharedModule,

    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
