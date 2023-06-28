import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './components/auth/auth.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [AppComponent, NavbarComponent, CategoriesComponent, ProductsComponent, ProductDetailsComponent, HomeComponent, ErrorComponent, CreateProductComponent, CreateCategoryComponent, AuthComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, FontAwesomeModule, HttpClientModule, ReactiveFormsModule, CKEditorModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
