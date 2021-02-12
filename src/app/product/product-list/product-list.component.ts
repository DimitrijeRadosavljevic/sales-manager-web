import { ProductDeleteDialogComponent } from './../product-delete-dialog/product-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../product.service';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Product } from 'src/app/_shared/models/product';
import { Router } from '@angular/router';
import {PaginatePipeArgs} from 'ngx-pagination/dist/paginate.pipe';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public products: Product[];
  public loading: number = 0;
  public products354: Product[];
  public paginationConfig: PaginatePipeArgs = {
    id: 'products',
    itemsPerPage: 6,
    currentPage: 1
  };
  public productForDelete: Product;

  constructor(private productService: ProductService, 
              private router: Router,
              private toastrService: ToastrService,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  public initializeComponent() {
    this.getProducts();
  }

  public getProducts() {
    this.loading++;
    this.productService.getProducts(this.paginationConfig.itemsPerPage, this.paginationConfig.currentPage).subscribe(
      response => {
        this.paginationConfig.totalItems = response.data.total;
        this.products = response.data.products as Product[];
        console.log(this.products);
      },
      error => { 
        console.log(error);
      },
      () => { this.loading--}
    )
  }

  public goToEdit(product: Product) {
    this.router.navigate([`/products/${product._id}`]);
  }

  public onPageChange($event) {
    this.paginationConfig.currentPage = $event;
    this.getProducts();
  }

  public setProductForDelete(product: Product) {
    this.productForDelete = product;
  }
  
  public onDeleteProduct(product: Product) {
    const deleteEvent = new EventEmitter<string>();
    deleteEvent.subscribe(productId=> {
      this.products = this.products.filter(product => product._id !== productId);
    })

    const dialogRef = this.matDialog.open(ProductDeleteDialogComponent);
    dialogRef.componentInstance.product = product;
    dialogRef.componentInstance.onDeleteEvent = deleteEvent;
  }

}
