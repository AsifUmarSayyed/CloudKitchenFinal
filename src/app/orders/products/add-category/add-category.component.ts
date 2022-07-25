import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  catgeoryId: any;
  catgeoryDetails: any;
  updatenewProduct: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private http: HttpClient
  ) {}
  imageUrl: any = 'https://i.ibb.co/fDWsn3G/buck.jpg';
  id: any;

  ngOnInit(): void {}
  updateProduct(form: any) {
    this.updatenewProduct = {
      id: form.value.id,
      categoryName: form.value.product_category,
    };
    this.http
      .post<any>('http://192.168.0.120:3000/categories/', this.updatenewProduct)
      .subscribe(
        (data) => {
          alert('Category Added Successfully!!');
          console.log(data);
        },
        (err) => {
          alert('Something went wrong!!');
        }
      );
    this.router.navigate(['/products/view-category']);
  }
}
