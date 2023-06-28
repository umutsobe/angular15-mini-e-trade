import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IProduct, ProductFirebaseService } from 'src/app/services/product-firebase.service';

@Component({
  selector: 'app-product-details',
  template: `
    <div *ngIf="this.product; else noProducts">
      <div class="container">
        <div class="container d-flex flex-wrap justify-content-center">
          <div class="card mx-2 mb-2 product-card" style="width: 12rem;">
            <div routerLink="/products/{{ product.id }}">
              <img src="{{ product.imageSource }}" class="card-img-top mb-0" />
              <div class="card-body m-0">
                <h5 class="card-header mt-0 p-0">{{ product.name }}</h5>
                <p class="description my-1" [innerHTML]="product.description"></p>
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
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  isProductsLoaded: boolean = false;
  constructor(private route: ActivatedRoute, private firebaseService: ProductFirebaseService, private titleService: Title) {
    //url'den productId bilgisini alıyor.
    this.route.params.subscribe((params) => {
      const id = params['productId'];
      this.firebaseService.getProductById(id).subscribe((result) => {
        this.titleService.setTitle(result.name);
        this.product = { ...result, id: id };
      });
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isProductsLoaded = true;
    }, 500);
  }
}
