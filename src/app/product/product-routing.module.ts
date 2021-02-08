import { ProductListComponent } from './product-list/product-list.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductEditorComponent } from './product-editor/product-editor.component';



const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: 'addNew',
    component: ProductEditorComponent
  },
  {
    path: ':productId',
    component: ProductEditorComponent
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
export class ProductRoutingModule { }
