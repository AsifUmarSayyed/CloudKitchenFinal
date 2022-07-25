import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ProductService } from '../product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss'],
})
export class ViewProductComponent implements OnInit {
  productId: any;
  productData: any;
  no = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.productId = data;
    });
    this.productService
      .viewSingleProduct(this.productId.id)
      .subscribe((data) => {
        this.productData = data;
        this.productData.forEach((a: any) => {
          Object.assign(a, { quantity: this.no, total: a.price });
        });
      });
  }

  addToCart(prd: any) {
    prd.quantity = this.no;
    this.productService.addToCart(prd);
    window.location.reload();
  }
  changed(ar: any) {
    console.log(ar);
    this.no = ar;
  }
}
