import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss'],
})
export class DeleteProductComponent implements OnInit {
  productId: any;
  productDetails: any;
  updatenewProduct: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data: any) => {
      this.productId = data.id;
    });
    this.productService.deleteProduct(this.productId).subscribe((data) => {
      this.productDetails = data;
      alert('product deleted suctssfully');
      this.router.navigate(['/products/view-table']);
    });
  }
}
