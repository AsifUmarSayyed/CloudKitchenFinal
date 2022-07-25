import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../product.service';

@Component({
  selector: 'app-view-product-by-category',
  templateUrl: './view-product-by-category.component.html',
  styleUrls: ['./view-product-by-category.component.scss'],
})
export class ViewProductByCategoryComponent implements OnInit {
  searchCategory: any;
  productList: any;
  categoryName: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.searchCategory = data;
    });
    this.productService
      .viewCategory(this.searchCategory.id)
      .subscribe((data) => {
        this.categoryName = data;
      });
    this.productService
      .searchCategoryProduct(this.searchCategory.id)
      .subscribe((data) => {
        this.productList = data;
      });
  }
}
