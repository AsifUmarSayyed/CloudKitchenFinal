import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListOrderComponent } from './orders/list-order/list-order.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./orders/products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./orders/products/products.module').then((m) => m.ProductsModule),
  },
  { path: 'orders', component: ListOrderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
