import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from './../_shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditorComponent } from './product-editor/product-editor.component';
import { ProductDeleteDialogComponent } from './product-delete-dialog/product-delete-dialog.component';



@NgModule({
  declarations: [ProductListComponent, ProductEditorComponent, ProductDeleteDialogComponent],
  imports: [
    SharedModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
