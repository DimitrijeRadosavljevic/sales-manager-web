import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../product.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/_shared/models/product';

@Component({
  selector: 'app-product-delete-dialog',
  templateUrl: './product-delete-dialog.component.html',
  styleUrls: ['./product-delete-dialog.component.scss']
})
export class ProductDeleteDialogComponent implements OnInit {

  @Input() product: Product;
  @Output() onDeleteEvent: EventEmitter<string> = new EventEmitter();

  constructor(private productService: ProductService,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  public deleteProduct() {
    this.productService.deleteProduct(this.product).subscribe(
      response => {
        this.onDeleteEvent.emit(this.product._id)
        this.toastrService.success("Product successfully deleted");

      },
      error => {
        this.toastrService.error("Some error ocured please try leater");
      }
    )
  }

}
