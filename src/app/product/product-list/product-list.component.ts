import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_shared/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public products: Product[];// = [{id: "3", name: "Product1", code: "354354", color: "orange", dimension: { height: 354, width: 354}}, {id: "3", name: "Product1", code: "354354", color: "orange", dimension: { height: 354, width: 354}}, {id: "3", name: "Product1", code: "354354", color: "orange", dimension: { height: 354, width: 354}}];
  public loading: number = 0;
  public products354: Product[];
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  public initializeComponent() {
    this.getProducts();
  }

  public getProducts() {
    this.loading++;
    this.productService.getProducts().subscribe(
      response => {
        this.products = response.data;
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

}
