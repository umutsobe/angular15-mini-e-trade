import { Component } from '@angular/core';
import { Category, CategoryFirebaseService } from 'src/app/services/category-firebase.service';

@Component({
  selector: 'app-categories',
  template: `
    <ul id="categories" class="list-group mt-0 mb-5">
      <div class="d-flex justify-content-center">
        <li routerLink="/products" class="list-group-item pe-2">Tüm Kategoriler</li>
        <li routerLink="products/category/{{ category.id }}" class="" *ngFor="let category of categories" class="list-group-item px-2">
          <div (click)="categoryClicked(category)">
            <a>{{ this.category.name }}</a>
          </div>
        </li>
      </div>
    </ul>
  `,
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  categories: Category[] = [];
  constructor(private firebaseCategory: CategoryFirebaseService) {
    this.firebaseCategory.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  public selectedCategory;

  categoryClicked(pr) {
    this.selectedCategory = pr;
  }
}
