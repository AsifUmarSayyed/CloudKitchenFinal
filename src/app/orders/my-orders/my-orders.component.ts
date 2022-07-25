import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit {
  productList: any;
  productId: any;
  categoryList: any;
  orderlist: any = null;

  row1: any;
  constructor(
    private productService: ProductService,
    private router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.productId = data;
      console.log(data);
    });
    this.productService.viewProduct().subscribe((data) => {
      this.productList = data;
    });
    this.productService.getCategory().subscribe((data) => {
      this.categoryList = data;
    });

    this.http
      .get<any>('http://localhost:3000/orders?cid=' + this.productId.id)
      .subscribe(
        (data) => {
          console.log(data);
          this.orderlist = data;
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
    //this.router.navigate(['../delete-product/' + prd.id]);
  }
  update(prd: any) {
    //this.router.navigate(['../update-product/' + prd.id]);
  }
  leg(orders: any) {
    console.log(orders.order);
  }
}
