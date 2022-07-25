import { Component, OnInit } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { observable } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  constructor(private productService: ProductService, private router: Router) {}
  prd: any;
  categoryList: any;
  imageUrl: any = 'https://i.ibb.co/fDWsn3G/buck.jpg';
  id: any;
  uploadFile(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
    }
  }

  ngOnInit(): void {
    this.productService.viewProduct().subscribe((data) => {
      this.id = Object.keys(data)[Object.keys(data).length - 1];
      this.prd = data;
      this.id = +this.prd[this.id].id + 1;
    });
    this.productService.getCategory().subscribe((data) => {
      this.categoryList = data;
    });
  }
  addNewProduct(form: any) {
    let newProduct = {
      id: parseInt(this.id),
      productName: form.value.product_name,
      category_id: form.value.product_category,
      decriptions: form.value.product_description,
      price: form.value.product_price,
      is_available: form.value.product_isAvailable,
      productImg: this.imageUrl,
      imgName: form.value.product_image.split(/[\\\/]/).pop(),
      rating: form.value.product_rating,
      review: form.value.product_review,
      vendor_name: form.value.shop_name,
    };

    console.log(newProduct);

    this.productService.createProduct(newProduct).subscribe((data) => {
      console.log(data);
      alert('Product Added Successfully');
      this.router.navigate(['/products/view-table']);

      ``;
    });
  }
}
