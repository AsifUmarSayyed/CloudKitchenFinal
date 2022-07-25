import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { SignupComponent } from 'src/app/signup/signup.component';
import { ListOrderComponent } from '../list-order/list-order.component';
import { MyOrdersComponent } from '../my-orders/my-orders.component';
import { AddCategoryComponent } from './add-category/add-category.component';

import { AddProductComponent } from './add-product/add-product.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

import { AuthGuard } from './auth.guard';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { ProductsComponent } from './products.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { UpdateOrdersComponent } from './update-orders/update-orders.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { UpdateUsersComponent } from './update-users/update-users.component';
import { ViewAllProductComponent } from './view-all-product/view-all-product.component';
import { ViewCategoryTableComponent } from './view-category-table/view-category-table.component';
import { ViewProductByCategoryComponent } from './view-product-by-category/view-product-by-category.component';
import { ViewProductByDateComponent } from './view-product-by-date/view-product-by-date.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { ViewTableComponent } from './view-table/view-table.component';
import { ViewUsersComponent } from './view-users/view-users.component';

const routes: Routes = [
  { path: '', component: ViewAllProductComponent, canActivate: [AuthGuard] },
  {
    path: 'view-user',
    component: ViewUsersComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'myOrders/:id',
    component: MyOrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Orders/:id',
    component: ListOrderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-category/:id',
    component: UpdateCategoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-category',
    component: AddCategoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-users/:id',
    component: UpdateUsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-orders/:id',
    component: UpdateOrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'view-category',
    component: ViewCategoryTableComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  {
    path: 'view-all',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'view-all/:id',
    component: ViewAllProductComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'view-table',
    component: ViewTableComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/:id',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'delete-product/:id',
    component: DeleteProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-product/:id',
    component: UpdateProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'list-product',
    component: ViewAllProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'view-product/:id',
    component: ViewProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'search-date',
    component: ViewProductByDateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'category/:id',
    component: ViewProductByCategoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-to-cart',
    component: AddToCartComponent,
    canActivate: [AuthGuard],
  },
  // { path: '**', component: LoginComponent }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
