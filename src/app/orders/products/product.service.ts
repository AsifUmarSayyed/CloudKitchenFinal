import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from 'src/app/site-layout/Category';
import { Product } from './product';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public cartItemList: any = [];
  public productItemList = new BehaviorSubject<any>([]);

  constructor(private httpClient: HttpClient) { }

  getCartProduct() {
    return this.productItemList.asObservable;
  }
  setCartProduct(prd: any) {
    this.cartItemList.push(...prd);
    this.productItemList.next(prd);
  }
  addToCart(prd: any) {
    let count: Boolean = false;
    if (localStorage.getItem('cartItemList') != null) {
      this.cartItemList = JSON.parse(localStorage.getItem('cartItemList')!);
    }
    for (let i = 0; i < this.cartItemList.length; i++) {
      if (this.cartItemList[i].id == prd.id) {
        this.cartItemList[i].quantity += Math.floor(prd.quantity);
        count = true;
      }
    }
    if (count != true) {
      this.cartItemList.push(prd);
    }

    console.log(this.cartItemList);
    this.productItemList.next(this.cartItemList);
    localStorage.setItem('cartItemList', JSON.stringify(this.cartItemList));
    this.getTotalPrice();
  }
  getTotalPrice() {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total;
    });
  }
  removeCartItem(prd: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (prd.id == a.id) {
        this.cartItemList.splice(index, 1);
      }
    });
  }
  removeAllCart() {
    this.cartItemList = [];
    this.productItemList.next(this.cartItemList);
  }

  createProduct(productBody: any) {
    const baseUrl = 'http://localhost:3000/product';
    return this.httpClient.post<Product>(baseUrl, productBody);
  }
  viewProducts(productId: Observable<Product>) {
    const baseUrl = 'http://localhost:3000/product?id=' + productId;
    return this.httpClient.get<Product>(baseUrl);
  }
  viewProduct() {
    const baseUrl = 'http://localhost:3000/product/';
    return this.httpClient.get<Product>(baseUrl);
  }
  viewSingleProduct(productId: Observable<Product>) {
    const baseUrl = 'http://localhost:3000/product?id=' + productId;
    return this.httpClient.get<Product>(baseUrl);
  }
  updateProduct(
    productId: Observable<Product>,
    productBody: Observable<Product>
  ) {
    const baseUrl = 'http://localhost:3000/product/' + productId;
    return this.httpClient.put<Product>(baseUrl, productBody);
  }
  deleteProduct(productId: Observable<Product>) {
    const baseUrl = 'http://localhost:3000/product/' + productId;
    return this.httpClient.delete<Product>(baseUrl);
  }
  searchCategoryProduct(categoryId: Observable<Product>) {
    const baseUrl = 'http://localhost:3000/product?category_id=' + categoryId;
    return this.httpClient.get<Product>(baseUrl);
  }
  searchDateProduct(dateParam: Observable<Product>) {
    const baseUrl = 'http://localhost:3000/product/date=' + dateParam;
    return this.httpClient.get<Product>(baseUrl);
  }
  getCategory() {
    const categoryUrl = 'http://localhost:3000/categories';
    return this.httpClient.get<Category>(categoryUrl);
  }
  viewCategory(categoryId: Observable<Product>) {
    const categoryUrl = 'http://localhost:3000/categories?id=' + categoryId;
    return this.httpClient.get<Category>(categoryUrl);
  }
  loggedIn() {
    return !!localStorage.getItem('userId');
  }
}
