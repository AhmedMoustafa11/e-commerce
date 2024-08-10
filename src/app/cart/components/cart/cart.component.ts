import { Component, OnInit } from '@angular/core';
import { Icart } from '../../../model/icart';
import { CartService } from '../../service/cart.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { UsdtoegpPipe } from '../../../pipe/usdtoegp.pipe';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, UsdtoegpPipe, MatButtonModule, MatDividerModule, MatIconModule,HttpClientModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartList: Icart[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((items: Icart[]) => {

      this.cartList = items

    });

    this.cartService.getTotalPrice().subscribe((price: number) => {
      this.totalPrice = price;
    });
  }

  prdTrackBnFn(index: number, prd: Icart): number {
    return prd.product.id;
  }

  delete(productId: number): void {
    this.cartService.removeFromCart(productId);
  }
}
