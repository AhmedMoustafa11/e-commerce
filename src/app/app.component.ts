import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { UserService } from './user/service/user.service';
import { ProductsService } from './products/service/products.service';
import { SharedService } from './shared/service/shared.service';
import { AdminService } from './admin/service/admin.service';






@Component({


  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    HttpClientModule,

  ],

  providers: [UserService, ProductsService, SharedService,AdminService,],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})





export class AppComponent {
  title = 'e-commerce';
 

  constructor() {


  }




}
 