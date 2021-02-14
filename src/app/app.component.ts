import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {State} from './store';
import {logout} from './store/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sales-manager-web';

  public showSidebar: boolean;

  public pages = [];

  public employeePages = [
    {
      title: 'Work',
      link: '/seller/work'
    },
    {
      title: 'Order',
      link: '/orders/seller'
    }
  ];

  public ownerPages = [
    {
      title: 'Employees',
      link: '/employees'
    },
    {
      title: 'Products',
      link: '/products'
    },
    {
      title: 'Orders',
      link: '/orders'
    },
    {
      title: 'Reports',
      link: '/reports'
    }
  ];

  constructor(private router: Router,
              private store: Store<State>) {
  }

  ngOnInit(): void {
    this.subscribeToShowSidebar();
  }

  private subscribeToShowSidebar(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showSidebar = !(this.router.url === '/login' ||
                            this.router.url === '/register');
      }

      if (this.router.url.includes('seller')) {
        this.pages = this.employeePages;
      }
      else {
        this.pages = this.ownerPages;
      }
    });
  }

  public logout(): void {
    this.store.dispatch(logout());
  }
}
