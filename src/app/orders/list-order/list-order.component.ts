import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss'],
})
export class ListOrderComponent implements OnInit {
  productList: any;
  categoryList: any;
  orderlist: any = null;
  user: any;
  status: any;
  allOrderList: any;

  row1: any;
  constructor(
    private productService: ProductService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http
      .get<any>('http://localhost:3000/signupUsers')
      .subscribe((data) => {
        this.user = data;
        console.log(data);
      });
    this.productService.viewProduct().subscribe((data) => {
      this.productList = data;
    });
    this.productService.getCategory().subscribe((data) => {
      this.categoryList = data;
    });

    this.http.get<any>('http://localhost:3000/orders').subscribe(
      (data) => {
        console.log(data);
        this.orderlist = data;
        this.allOrderList = data;
        // for (let i = 0; i < this.orderlist?.length; i++) {
        //   this.row1[i] = this.orderlist?.order?.length;
        // }
        // console.log(this.row1);
      },
      (err) => {
        alert('Something went wrong!!');
      }
    );
  }
  delete(prd: any) {
    this.http
      .delete<any>('http://localhost:3000/orders/' + prd.id)
      .subscribe((data) => {
        alert('Deleted Sucessfully!!');
      });
    window.location.reload();
  }
  update(catg: any) {
    this.router.navigate(['/products/update-orders/' + catg.id]);
  }
  leg(orders: any) {
    console.log(orders.order);
  }
  search() {
    if (this.status == '') {
      this.ngOnInit();
    } else {
      this.orderlist = this.allOrderList.filter((res: any) => {
        return res.status
          .toLocaleLowerCase()
          .match(this.status.toLocaleLowerCase());
      });
    }
  }
}
