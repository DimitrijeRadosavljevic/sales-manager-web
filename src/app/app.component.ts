import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sales-manager-web';

  public showSidebar: boolean;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.subscribeToShowSidebar()
  }

  private subscribeToShowSidebar(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showSidebar = !(this.router.url === '/login' ||
                            this.router.url === '/register' ||
                            this.router.url === '/seller/work');
      }
    });
  }
}
