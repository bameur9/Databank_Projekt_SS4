import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { EditCreateComponent } from './admin/edit-create/edit-create.component';
import { ProductsComponent } from './admin/products/products.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AdminGuard } from './guards/admin.guard';
import { CheckoutGuard } from './guards/checkout.guard';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent , canActivate: [UserGuard]},
  {path: 'products/:id', component: ProductDetailsComponent, canActivate: [UserGuard]},
  {path: 'admin/dashboard/:id', component: AdmindashboardComponent,canActivate:[AdminGuard]},
  {path: 'admin/dashboard/:action/:id', component: EditCreateComponent,canActivate:[AdminGuard]},
  {path: 'cart-details', component: CartDetailsComponent, canActivate: [UserGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'admin/dashboard', component: AdmindashboardComponent,  canActivate:[AdminGuard]},
  {path: 'checkout', component: CheckoutComponent, canActivate: [CheckoutGuard]},
  {path: 'category', component:ProductListComponent, canActivate: [UserGuard]},
  {path: 'products', component: ProductListComponent, canActivate: [UserGuard]},

  {path: '', redirectTo: '/products', pathMatch: 'full' },
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
  //{path: '**', component: PageNotFountComponent} 404Errors
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
