import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {
  productId: any;
  productDetails: any;
  updatenewProduct: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}
  imageUrl: any = 'https://i.ibb.co/fDWsn3G/buck.jpg';
  id: any;
  categoryList: any;
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
    this.activatedRoute.params.subscribe((data: any) => {
      this.productId = data.id;
      console.log(this.productId);
    });

    this.productService.viewSingleProduct(this.productId).subscribe((data) => {
      this.productDetails = data;
      console.log(this.productDetails);
    });
    this.productService.getCategory().subscribe((data) => {
      this.categoryList = data;
    });
  }
  updateProduct(form: any) {
    if (this.imageUrl == 'https://i.ibb.co/fDWsn3G/buck.jpg') {
      this.imageUrl = this.productDetails[0].productImg;
    }
    this.updatenewProduct = {
      id: form.value.id,
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
    console.log('hi');
    console.log(this.updatenewProduct);

    this.productService
      .updateProduct(this.productId, this.updatenewProduct)
      .subscribe((data) => {
        console.log(data);
        alert('sucess');
        this.router.navigate(['/products/view-table']);
      });
  }
}
