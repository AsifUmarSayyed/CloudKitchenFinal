import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/orders/products/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  count: any = 0;
  temVar: any = localStorage.getItem('userId');
  constructor(
    private productService: ProductService,
    private router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {
    this.lSuser = JSON.parse(this.temVar);
    console.log(this.lSuser);
  }
  cont: any = true;
  categoryList: any;
  lSuser: any;
  public Customer = 'Customer';
  public Admin = 'Admin';
  public userId: any;
  public userData: any;
  ngOnChanges() {}

  ngOnInit(): void {
    // if (!localStorage.getItem('foo')) {
    //   localStorage.setItem('foo', 'no reload');
    //   location.reload();
    // } else {
    //   localStorage.removeItem('foo');
    // }
    // let aval: any = true;

    // console.log(this.lSuser);
    // if (lSuser != null) {
    //   this.userId = lSuser;
    //   console.log(this.userId);
    // } else {
    //   this.userId = null;
    // }

    this.http
      .get<any>(`http://localhost:3000/signupUsers/` + this.lSuser)
      .subscribe((data) => {
        this.userData = data;
      });

    let a = JSON.parse(localStorage.getItem('cartItemList')!);
    if (localStorage.getItem('cartItemList') != null) {
      this.count = a.length;
    }

    this.productService.getCategory().subscribe((data) => {
      this.categoryList = data;
    });
  }

  gocart() {
    this.router.navigate(['/products/add-to-cart']);
  }
  signup() {
    this.router.navigate(['/signup']);
  }
  login() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  home() {
    this.router.navigate(['/view-all/' + this.lSuser]);
  }
  admin() {
    this.router.navigate(['/admin/', this.lSuser]);
  }
  myorder() {
    this.router.navigate(['/myOrders/', this.lSuser]);
  }
  order() {
    this.router.navigate(['/Orders/', this.lSuser]);
  }
}
