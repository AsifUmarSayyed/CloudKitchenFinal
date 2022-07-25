import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOrderComponent } from './list-order/list-order.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListOrderComponent, MyOrdersComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [ListOrderComponent],
})
export class OrdersModule {}
