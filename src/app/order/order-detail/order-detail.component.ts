import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/_shared/models/order';
import { OrderService } from '../order.service';
import {select, Store} from '@ngrx/store';
import { State } from "../../store"
import { authUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  public order: Order;
  private orderId: string;
  public loading: number = 0;
  constructor(private route: ActivatedRoute,
              private orderService: OrderService,
              private store: Store<State>,
              private router: Router) { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent() {
    this.route.paramMap.subscribe(params => {
      if(params.has('orderId')) {
        this.orderId = params.get('orderId');
        this.fetchOrder(this.orderId);
      }
    })
  }

  private fetchOrder(orderId: string) {
    this.loading++;
    this.orderService.fetchOrder(orderId).subscribe(
      response => {
        this.order = response.data;
        console.log(response.data);
      },
      error => {
        console.log(error);
      },
      () => { this.loading--}
    )
  }

  public goBack() {
    this.store.pipe(select(authUser)).subscribe(
      user => {
        if(user.owner) {
          this.router.navigate(['orders'])
          console.log("Owner");
        } else {
          this.router.navigate(['orders/seller'])
        }
    })
  }

}
