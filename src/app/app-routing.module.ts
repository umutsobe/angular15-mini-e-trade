import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ErrorComponent } from './components/error/error.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { AuthComponent } from './components/auth/auth.component';
import { AdminGuard } from './guards/admin-guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:productId', component: ProductDetailsComponent },
  { path: 'products/category/:categoryId', component: ProductsComponent },
  { path: 'createProduct', component: CreateProductComponent, canActivate: [AdminGuard] },
  { path: 'createCategory', component: CreateCategoryComponent, canActivate: [AdminGuard] },
  { path: 'auth', component: AuthComponent },

  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
