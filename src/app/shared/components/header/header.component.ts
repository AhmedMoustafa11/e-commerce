import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

import { UserService } from '../../../user/service/user.service';
import { SharedService } from '../../service/shared.service';
import { CartService } from '../../../cart/service/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, HttpClientModule, MatDividerModule, MatIconModule, MatButtonModule, MatBadgeModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isUserLogged = false;
  isAdminLogged = false;
  cartItems = 0;

  constructor(
  
    private sharedService: SharedService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.sharedService.getUserLoggedStatus().subscribe(status => {
      this.isUserLogged = status || !!this.sharedService.getCurrentUser();
    });

    this.sharedService.getAdminLoggedStatus().subscribe(status => {
      this.isAdminLogged = status || !!this.sharedService.getCurrentAdmin();
    });

    this.cartService.getItemCount().subscribe(count => {
      this.cartItems = count;
    });
  }

  logout(): void {
    this.sharedService.logout();
    this.cartItems = 0; 
  }

  login(): void {
    this.cartService.loadCartFromLocalStorage(); 
  }
}
