import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-update-orders',
  templateUrl: './update-orders.component.html',
  styleUrls: ['./update-orders.component.scss'],
})
export class UpdateOrdersComponent implements OnInit {
  productId: any;
  productDetails: any;
  updatenewProduct: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private http: HttpClient
  ) {}

  id: any;
  orderList: any;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data: any) => {
      this.productId = data.id;
      console.log(this.productId);
    });
    this.http
      .get<any>('http://localhost:3000/orders?id=' + this.productId)
      .subscribe((data) => {
        this.orderList = data;
        console.log(data);
      });
  }
  updateProduct(form: any) {
    let val = form.value.status;
    console.log(this.orderList);
    this.http
      .put<any>(
        'http://localhost:3000/orders/' + this.productId,
        this.orderList[0]
      )
      .subscribe((data) => {
        alert('Order Updated Sucessfully!!');
      });
  }
}
