import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-view-category-table',
  templateUrl: './view-category-table.component.html',
  styleUrls: ['./view-category-table.component.scss'],
})
export class ViewCategoryTableComponent implements OnInit {
  productList: any;
  categoryList: any;
  allProductList: any;
  categoryName: any;
  constructor(
    private productService: ProductService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.productService.viewProduct().subscribe((data) => {
      this.productList = data;
    });
    this.productService.getCategory().subscribe((data) => {
      this.categoryList = data;
      this.allProductList = data;
    });
  }
  update(catg: any) {
    this.router.navigate(['/products/update-category/' + catg.id]);
  }
  add() {
    this.router.navigate(['/products/add-category/']);
  }
  delete(catg: any) {
    this.http
      .delete<any>('http://192.168.0.120:3000/categories/' + catg.id)
      .subscribe((data) => {
        alert('Successfully Deleted Category!!');
      });

    window.location.reload();
  }
  search() {
    if (this.categoryName == '') {
      this.ngOnInit();
    } else {
      this.categoryList = this.allProductList.filter((res: any) => {
        return res.categoryName
          .toLocaleLowerCase()
          .match(this.categoryName.toLocaleLowerCase());
      });
    }
  }
}
