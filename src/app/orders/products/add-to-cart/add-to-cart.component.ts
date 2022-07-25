import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
})
export class AddToCartComponent implements OnInit {
  productList: any;
  total: any = 0;
  orderItemList: any = [];
  public order!: FormGroup;

  constructor(
    private productService: ProductService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/orders').subscribe((data) => {
      if (data) {
        this.orderItemList = data;
        localStorage.setItem(
          'orderItemList',
          JSON.stringify(this.orderItemList)
        );
        console.log(this.orderItemList);
      }
    });
    if (localStorage.getItem('cartItemList') != null) {
      this.productList = JSON.parse(localStorage.getItem('cartItemList')!);
    }
    if (this.productList == 0) {
      this.productList = null;
    }
    for (let i = 0; i < this.productList?.length; i++) {
      this.productList[i].total =
        Math.floor(this.productList[i].price) * this.productList[i].quantity;
      this.total += this.productList[i].total;
    }
  }

  add(prd: any) {
    if (prd.quantity >= 0) {
      prd.quantity += 1;
      prd.total = +prd.price * prd.quantity;
      this.total += +prd.price;
    }
  }
  sub(prd: any) {
    if (prd.quantity > 0) {
      prd.quantity -= 1;
      prd.total = +prd.price * prd.quantity;
      this.total -= +prd.price;
    }
  }
  cel() {
    localStorage.removeItem('cartItemList');
    localStorage.removeItem('orderItemList');
    window.location.reload();
  }
  del(prd: any) {
    for (let i = 0; i < this.productList.length; i++) {
      if (this.productList[i].id == prd.id) {
        this.productList.splice(i, 1);
        localStorage.setItem('cartItemList', JSON.stringify(this.productList));
      }
    }
    if (this.productList.length == 0) {
      this.productList = null;
    }
    window.location.reload();
  }

  proceed() {
    console.log(this.productList);

    this.order = this.formBuilder.group({
      cid: JSON.parse(localStorage.getItem('userId')!),
      date: new Date(),
      order: [],
      status: 'pending',
      grand: this.total,
    });
    this.order.patchValue({
      order: this.productList,
    });
    this.orderItemList.push(this.order.value);
    console.log(this.orderItemList);

    this.http
      .post<any>('http://localhost:3000/orders', this.order.value)
      .subscribe(
        (data) => {
          console.log(data);
          alert('Order Placed Successfully');
          this.cel();
        },
        (err) => {
          alert('Something went wrong');
        }
      );
  }
}
