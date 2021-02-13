import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatePipeArgs } from 'ngx-pagination/dist/paginate.pipe';
import { Order } from 'src/app/_shared/models/order';
import { OrderService } from '../order.service';

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

  constructor(private orderService: OrderService,
              private router: Router) { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent() {
    this.fetchOrders();
  }

  private fetchOrders() {
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
  }

  public onPageChange($event) {
    this.paginationConfig.currentPage = $event;
    this.fetchOrders();
  }

  public goToDetail(order: Order) {
    this.router.navigate([`/orders/${order._id}`]);
  }

}
