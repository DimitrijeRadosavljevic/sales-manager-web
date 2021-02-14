import { User } from './../../_shared/models/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {select, Store} from '@ngrx/store';
import { State } from "../../store"
import { PaginatePipeArgs } from 'ngx-pagination/dist/paginate.pipe';
import { Order } from 'src/app/_shared/models/order';
import { OrderService } from '../order.service';
import { authUser } from 'src/app/store/auth/auth.selectors';

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

  constructor(private orderService: OrderService,
              private router: Router,
              private store: Store<State>) { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent() {
    this.fetchOrders();
  }

  private fetchOrders() {
    this.store.pipe(select(authUser)).subscribe(user => {
      this.user = user;
      if(user.owner) {
        this.loading++;
        this.orderService.fetchOrders(this.paginationConfig.itemsPerPage, this.paginationConfig.currentPage).subscribe(
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
        this.orderService.fetchSellerOrders(this.paginationConfig.itemsPerPage, this.paginationConfig.currentPage).subscribe(
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

}
