import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IProduct, ProductFirebaseService } from 'src/app/services/product-firebase.service';

@Component({
  selector: 'app-products',
  template: `
    <div class="container d-flex flex-wrap justify-content-center">
      <div *ngIf="loading" class="spinner-border " role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div *ngIf="this.products.length > 0; else noProducts">
        <div class="container mx-auto d-flex flex-wrap">
          <div *ngFor="let product of this.products" class="card mx-2 mb-2 product-card" style="width: 9rem;">
            <div routerLink="/products/{{ product.id }}">
              <p class="mb-1">
                <span class="credi-info mb-0">Kredi ile 12 Taksit</span>
              </p>
              <img src="{{ product.imageSource }}" class="card-img-top mb-0" />
              <div class="card-body m-0">
                <p><span class="cargo-date-info ms-0 mb-0">11 Mayıs Perşembe teslimat</span></p>
                <h5 class="card-header mt-0 p-0">{{ product.name }}</h5>
                <!-- <p class="description my-1">{{ product.description }}</p> -->
                <div class="fa-star" [innerHTML]="this.firebaseService.getStar(product.star)"></div>
                <h5 class="price text-center mt-1">{{ product.price }}$</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ng-template #noProducts>
      <div *ngIf="isProductsLoaded" class="alert alert-warning">No Products</div>
    </ng-template>
  `,
  styleUrls: ['./product.component.css'],
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];
  loading: boolean = true;
  isProductsLoaded: boolean = false;

  constructor(private route: ActivatedRoute, public firebaseService: ProductFirebaseService, private titleService: Title) {
    titleService.setTitle('Products');
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.firebaseService.getProducts(params['categoryId']).subscribe((data) => {
        this.products = [];
        this.products = data;
        this.loading = false;
      });
    });
    setTimeout(() => {
      this.isProductsLoaded = true;
    }, 500);
  }
}
