import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdsModule } from '@cds/angular';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchByNameComponent } from './components/search-by-name/search-by-name.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

import { CartService } from './services/cart.service';
import { CheckoutService } from './services/checkout.service';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { ProductsComponent } from './admin/products/products.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { EditCreateComponent } from './admin/edit-create/edit-create.component';
import { CategoriesComponent } from './admin/categories/categories.component';

import { EditCreateCategoryComponent } from './admin/edit-create-category/edit-create-category.component';







@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    NavbarComponent,
    ProductCategoryMenuComponent,
    SearchByNameComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginStatusComponent,
    LoginComponent,
    OrderComponent,
    ProductsComponent,
    AdmindashboardComponent,
    EditCreateComponent,
    CategoriesComponent,
    EditCreateCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CdsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  schemas: [  NO_ERRORS_SCHEMA ],
  providers: [ProductService,
              CartService,
              CheckoutService,
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }
