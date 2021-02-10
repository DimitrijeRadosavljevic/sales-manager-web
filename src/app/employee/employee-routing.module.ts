import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EmployeeEditorComponent} from './employee-editor/employee-editor.component';



const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent
  },
  {
    path: ':employeeId/edit',
    component: EmployeeEditorComponent
  },
  {
    path: 'create',
    component: EmployeeEditorComponent
  }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class EmployeeRoutingModule { }
