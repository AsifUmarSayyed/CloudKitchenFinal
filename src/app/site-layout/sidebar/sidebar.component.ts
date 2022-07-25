import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/orders/products/product.service';
import { Category } from '../Category';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  categoryList: any;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getCategory().subscribe((data) => {
      this.categoryList = data;
    });
  }
}
