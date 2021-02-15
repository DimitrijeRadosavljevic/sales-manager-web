import { ToastrService } from 'ngx-toastr';
import { User } from './../../_shared/models/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {select, Store} from '@ngrx/store';
import { State } from "../../store"
import { PaginatePipeArgs } from 'ngx-pagination/dist/paginate.pipe';
import { Order } from 'src/app/_shared/models/order';
import { OrderService } from '../order.service';
import { authUser } from 'src/app/store/auth/auth.selectors';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  
  public orders: Order[];
  public loading: number = 0;
  public paginationConfig: PaginatePipeArgs = {
    id: 'products',
    itemsPerPage: 10,
    currentPage: 1
  };
  public user: User;
  public filter: FormControl;
  public filterFormGroup: FormGroup;
  private filterValue: string;

  constructor(private orderService: OrderService,
              private router: Router,
              private store: Store<State>,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent() {
    this.fetchOrders();
    this.buildFilter();
  }

  private fetchOrders() {
    this.store.pipe(select(authUser)).subscribe(user => {
      this.user = user;
      if(user.owner) {
        this.loading++;
        this.orderService.fetchOrders(this.paginationConfig.itemsPerPage, this.paginationConfig.currentPage,  this.filterValue).subscribe(
          response => {
            this.paginationConfig.totalItems = response.data.total;
            this.orders = response.data.orders as Order[];
            console.log(this.orders);
          },
          error => { 
            console.log(error); 
          },
          ()=> { this.loading--; }
        )
      } else {
        this.loading++;
        this.orderService.fetchSellerOrders(this.paginationConfig.itemsPerPage, this.paginationConfig.currentPage,  this.filterValue).subscribe(
          response => {
            this.paginationConfig.totalItems = response.data.total;
            this.orders = response.data.orders as Order[];
          },
          error => { 
            console.log(error); 
          },
          ()=> { this.loading--; }
        )
      }
    })
  }

  private buildFilter() {
    this.filterFormGroup = new FormGroup({
      filter: new FormControl()
    })

    this.filterFormGroup.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged())
      .subscribe(value => {
          this.filterValue = value.filter;
          this.fetchOrders();
      });
  }

  public onPageChange($event) {
    this.paginationConfig.currentPage = $event;
    this.fetchOrders();
  }

  public goToDetail(order: Order) {
    if(this.user.owner) {
      this.router.navigate([`/orders/${order._id}`]);
    } else {
      this.router.navigate([`/orders/${order._id}/seller`])
    }
  }

  public updateOrderStatus(order: Order) {
    this.orderService.updateOrderStatus(order).subscribe(
      respond => {
        const index = this.orders.findIndex( orderFromArray => orderFromArray._id.toString() === order._id.toString() );
        // console.log("Indeks", index);
        // console.log(order._id);
        this.orders[index].status = !order.status;
        this.toastrService.success("Order status is successfuly changed");
      },
      error => {
        this.toastrService.error("Some error ocured please try leater");
      }
    )
  }

}
