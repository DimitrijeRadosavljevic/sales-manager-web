import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'products',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./order/order.module').then(m => m.OrderModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./report/report.module').then(m => m.ReportModule)
  },
  {
    path: 'employees',
    loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
  },
  {
    path: 'seller',
    loadChildren: () => import('./seller/seller.module').then(m => m.SellerModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
