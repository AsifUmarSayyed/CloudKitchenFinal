import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-view-table',
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.scss'],
})
export class ViewTableComponent implements OnInit {
  productList: any;
  categoryList: any;
  productName: any;
  category_id: any;
  allProductList: any;
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.viewProduct().subscribe((data) => {
      this.productList = data;
      this.allProductList = data;
    });
    this.productService.getCategory().subscribe((data) => {
      this.categoryList = data;
    });
  }
  delete(prd: any) {
    this.router.navigate(['../delete-product/' + prd.id]);
  }
  update(prd: any) {
    this.router.navigate(['../update-product/' + prd.id]);
  }
  search() {
    if (this.productName == '') {
      this.ngOnInit();
    } else {
      this.productList = this.productList.filter((res: any) => {
        return res.productName
          .toLocaleLowerCase()
          .match(this.productName.toLocaleLowerCase());
      });
    }
  }
  csearch(cid: any) {
    if (this.category_id == '') {
      this.ngOnInit();
    } else {
      this.productList = this.allProductList.filter((res: any) => {
        return res.category_id.match(cid);
      });
    }
  }
}
