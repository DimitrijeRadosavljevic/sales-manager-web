import { Component, Input, OnInit } from '@angular/core';
import { PaginatePipeArgs } from 'ngx-pagination/dist/paginate.pipe';

import { Product } from '../../_shared/models/product';
import { ProductService } from '../../product/product.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OrderService} from '../../order/order.service';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  public products: Product[];
  public loading: number = 0;
  public chartItems: Product[] = [];
  public paginationConfig: PaginatePipeArgs = {
    id: 'products',
    itemsPerPage: 6,
    currentPage: 1
  };

  userDetailForm: FormGroup;

  public showChart: boolean = false;
  public orderStatus: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private toastrService: ToastrService,
              private productService: ProductService,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent(): void {
    this.getProducts();
    this.buildUserDetailForm();
  }

  private getProducts(): void {
    this.loading++;
    this.productService.getProducts(this.paginationConfig.itemsPerPage, this.paginationConfig.currentPage).subscribe(
      response => {
        this.paginationConfig.totalItems = response.data.total;
        this.products = response.data.products as Product[];
      },
      error => {
        console.log(error);
      },
      () => {
        this.loading--;
      }
    );
  }

  public onPageChange($event): void {
    this.paginationConfig.currentPage = $event;
    this.getProducts();
  }

  private buildUserDetailForm(): void {
    this.userDetailForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      phone: ['']
    });
  }

  public addToChart(product: Product): void {
    product['count'] = 1;
    this.chartItems.push(product);
  }

  public removeFromChart(productId: string): void {
    this.chartItems = this.chartItems.filter(product => product._id !== productId);
    if (this.chartItems.length == 0) {
      this.toggleChart(false);
    }
  }

  public productInChart(productId: string): boolean {
    const product = this.chartItems.find(product => product._id === productId);
    return product == null ? false : true;
  }

  public toggleChart(value): void {
    this.showChart = value;
    this.userDetailForm.markAsUntouched();
  }

  public setOrderStatus() {
    this.orderStatus = !this.orderStatus;
  }

  public getTotalPrice(): number {
    return this.chartItems.reduce((acc, product) => {
      return acc + product.staffSalePrice * product['count'];
    }, 0);
  }

  public incrementCount(productId: string): void {
    this.chartItems = this.chartItems.map(product => {
      if (product._id === productId) {
        if (product.quantity > product['count']) {
          product['count']++;
        }
      }
      return product;
    });
  }


  public decrementCount(productId: string): void {
    this.chartItems = this.chartItems.map(product => {
      if (product._id === productId) {
        if (product['count'] > 1) {
          product['count']--;
        }

      }
      return product;
    });
  }

  public onCheckout(): void {
    if (this.userDetailForm.invalid) {
        this.userDetailForm.markAllAsTouched();
      return;
    }

    const order = {
      userDetail: this.userDetailForm.value,
      chartItems: this.chartItems.map(product => {
        return {
          name: product.name,
          code: product.code,
          staffSalePrice: product.staffSalePrice,
          dimensions: product.dimensions,
          quantity: product['count'],
          color: product.color
        };
      }),
      amount: this.getTotalPrice(),
      status: this.orderStatus
    };

    console.log(this.chartItems);
    console.log(order);

    this.orderService.postOrder(order).subscribe(
      result => {
        this.toastrService.success('Order successfuly created');
        this.userDetailForm.reset();
        this.chartItems = [];
        this.toggleChart(false);
      },
      error => {
        this.toastrService.error('Error occurred, try again later');
      }
    );
  }
}
