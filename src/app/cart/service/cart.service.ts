import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Iproduct } from '../../model/iproduct';
import { Icart } from '../../model/icart';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Icart[] = [];
  private cartSubject = new BehaviorSubject<Icart[]>([]);
  private totalPriceSubject = new BehaviorSubject<number>(0);
  private itemCountSubject = new BehaviorSubject<number>(0);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadCartFromLocalStorage();
    }
  }



 loadCartFromLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      if (user) {
        this.cartItems = JSON.parse(user).cart || [];
        this.updateCart();
      }
    }
  }


  setCart(items: Icart[]): void {
    this.cartItems = items;
    this.updateCart();
  }


  

  addToCart(product: Iproduct, itemCount: number): void {
    if (itemCount <= 0) return;

    const existingItem = this.cartItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.itemCount += itemCount;
    } else {
      this.cartItems.push({ product, itemCount });
    }

    this.updateCart();
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.updateCart();
  }

  private updateCart(): void {
    this.cartSubject.next([...this.cartItems]);
    this.saveCartToLocalStorage();
    this.calculateTotalPrice();
    this.updateItemCount();
  }

  private saveCartToLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      if (user) {
        const userData = JSON.parse(user);
        userData.cart = this.cartItems;
        localStorage.setItem('user', JSON.stringify(userData));
      }
    }
  }

 


  private updateItemCount(): void {
    const itemCount = this.cartItems.reduce((total, item) => total + item.itemCount, 0);
    this.itemCountSubject.next(itemCount);
  }

  private calculateTotalPrice(): void {
    const total = this.cartItems.reduce((sum, item) => sum + item.product.price * item.itemCount, 0);
    this.totalPriceSubject.next(total);
  }

  getCartItems(): Observable<Icart[]> {
    return this.cartSubject.asObservable();
  }

  getTotalPrice(): Observable<number> {
    return this.totalPriceSubject.asObservable();
  }

  getItemCount(): Observable<number> {
    return this.itemCountSubject.asObservable();
  }
}