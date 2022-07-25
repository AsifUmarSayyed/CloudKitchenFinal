import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../product.service';

@Component({
  selector: 'app-view-all-product',
  templateUrl: './view-all-product.component.html',
  styleUrls: ['./view-all-product.component.scss'],
})
export class ViewAllProductComponent implements OnInit {
  productList: any;
  userId: any;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.userId = data;
      // localStorage.setItem('userId', JSON.stringify(this.userId.id));
      //console.log(this.userId.id);
    });
    this.productService.viewProduct().subscribe((data) => {
      this.productList = data;
    });
  }
}
