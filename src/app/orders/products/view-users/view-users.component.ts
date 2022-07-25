import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss'],
})
export class ViewUsersComponent implements OnInit {
  productList: any;
  userList: any;
  categoryList: any;
  fullname: any;
  type: any;
  allProductList: any;
  constructor(
    private productService: ProductService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.http
      .get<any>('http://localhost:3000/signupUsers')
      .subscribe((data) => {
        this.userList = data;
        this.allProductList = data;
        console.log(data);
      });
    this.productService.viewProduct().subscribe((data) => {
      this.productList = data;
    });
    this.productService.getCategory().subscribe((data) => {
      this.categoryList = data;
    });
  }
  update(catg: any) {
    this.router.navigate(['/products/update-users/' + catg.id]);
  }
  delete(catg: any) {
    this.http
      .delete<any>('http://localhost:3000/signupUsers/' + catg.id)
      .subscribe((data) => {
        alert('User Deleted Successfully!!');
        window.location.reload();
      });
  }
  search() {
    if (this.fullname == '') {
      this.ngOnInit();
    } else {
      this.userList = this.userList.filter((res: any) => {
        return res.fullname
          .toLocaleLowerCase()
          .match(this.fullname.toLocaleLowerCase());
      });
    }
  }
  tsearch() {
    if (this.type == '') {
      this.ngOnInit();
    } else {
      this.userList = this.allProductList.filter((res: any) => {
        return res.type
          .toLocaleLowerCase()
          .match(this.type.toLocaleLowerCase());
      });
    }
  }
}
