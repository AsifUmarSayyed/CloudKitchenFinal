import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.scss'],
})
export class UpdateUsersComponent implements OnInit {
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
  UserList: any;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data: any) => {
      this.productId = data.id;
      console.log(this.productId);
    });
    this.http
      .get<any>('http://localhost:3000/signupUsers?id=' + this.productId)
      .subscribe((data) => {
        this.UserList = data;
        console.log(this.UserList);
      });
  }
  updateProduct(form: any) {
    this.updatenewProduct = {
      id: form.value.id,
      fullname: form.value.fullname,
      address: form.value.fullname,
      email: form.value.email,
      mobile: form.value.mobile,
      type: form.value.type,
      password: form.value.password,
    };
    console.log(this.updatenewProduct);
    this.http
      .put<any>(
        'http://localhost:3000/signupUsers/' + this.productId,
        this.updatenewProduct
      )
      .subscribe((data) => {
        alert('Successfully Updated!!');
        //this.router.navigate(['/products/view-user']);
      });

    this.router.navigate(['/products/view-user']);
  }
}
