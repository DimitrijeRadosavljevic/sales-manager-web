import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
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
              private toastrService: ToastrService) { }

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
  
  public onDeleteProduct() {
    if(!this.productForDelete)
      return
    this.loading++;
    this.productService.deleteProduct(this.productForDelete._id).subscribe(
      response => {
        this.toastrService.success("Product successfully deleted");
        this.getProducts();
      },
      error => {
        this.toastrService.error("Some error ocured please try leater");
      },
      () => {
        this.loading--;
      }
    )
  }

  public delete(product) {
    this.loading++;
    this.productService.deleteProduct(product._id).subscribe(
      response => {
        this.toastrService.success("Product successfully deleted");
        this.getProducts();
      },
      error => {
        this.toastrService.error("Some error ocured please try leater");
      },
      () => {
        this.loading--;
      }
    )
  }

}
