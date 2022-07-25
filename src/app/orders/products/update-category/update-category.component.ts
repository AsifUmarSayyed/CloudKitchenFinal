import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss'],
})
export class UpdateCategoryComponent implements OnInit {
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

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data: any) => {
      this.catgeoryId = data.id;
      console.log(this.catgeoryId);
    });
    this.http
      .get<any>('http://192.168.0.120:3000/categories?id=' + this.catgeoryId)
      .subscribe(
        (data) => {
          console.log(data);
          this.catgeoryDetails = data;
        },
        (err) => {
          alert('Something went wrong!!');
        }
      );
  }
  updateProduct(form: any) {
    this.updatenewProduct = {
      id: form.value.id,
      categoryName: form.value.product_category,
    };
    this.http
      .put<any>(
        'http://192.168.0.120:3000/categories/' + this.catgeoryId,
        this.updatenewProduct
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          alert('Something went wrong!!');
        }
      );
    this.router.navigate(['/products/view-category']);
  }
}
