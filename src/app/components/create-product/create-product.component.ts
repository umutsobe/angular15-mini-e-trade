import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category, CategoryFirebaseService } from 'src/app/services/category-firebase.service';
import { ProductFirebaseService } from 'src/app/services/product-firebase.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create-product',
  styleUrls: ['./create-product.component.css'],
  template: `
    <form [formGroup]="frm" (ngSubmit)="onSubmit()" class="w-50 container">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" id="name" formControlName="name" />
        <div *ngIf="!name.valid && (name.dirty || name.touched)" style="color:chocolate; font-size: 12px;">İsim girişi zorunludur</div>
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">Price</label>
        <input class="form-control" id="price" rows="3" formControlName="price" />
        <div *ngIf="!price.valid && (price.dirty || price.touched)" style="color:chocolate; font-size: 12px;">Fiyat girişi zorunludur</div>
      </div>
      <div class="mb-3">
        <label for="imageSource" class="form-label">Image Source</label>
        <input type="text" class="form-control" id="imageSource" formControlName="imageSource" />
        <div *ngIf="!imageSource.valid && (imageSource.dirty || imageSource.touched)" style="color:chocolate; font-size: 12px;">Dosya ismi girişi zorunludur</div>
      </div>
      <div class="mb-3">
        <label for="star" class="form-label">Star</label>
        <div class="form-group">
          <span><input type="range" class="form-range w-75" min="1" max="5" id="star" formControlName="star" /> </span>
          <span class="ms-2"> Değer:{{ star.value }}</span>
        </div>
        <div *ngIf="!star.valid && (star.dirty || star.touched)" style="color:chocolate; font-size: 12px;">Yıldız girişi zorunludur</div>
      </div>
      <div class="mb-3">
        <div class="form-check">
          <label class="form-check-label" for="isActive"> Is Active </label>
          <input class="form-check-input" type="checkbox" id="isActive" formControlName="isActive" value="" checked />
        </div>
      </div>
      <div class="mb-3">
        <label for="category" class="form-label">Category</label>
        <select class="form-select" id="category" aria-label="Default select example" formControlName="category">
          <option value="0">Kategori</option>
          <option *ngFor="let category of categories" value="{{ category.id }}">{{ category.name }}</option>
        </select>
        <div *ngIf="!category.valid && (category.dirty || category.touched)" style="color:chocolate; font-size: 12px;">Kategori girişi zorunludur</div>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <!-- <textarea class="form-control" id="description" rows="3" formControlName="description"></textarea> -->
        <ckeditor [editor]="Editor" class="form-control" formControlName="description"></ckeditor>
        <div *ngIf="!description.valid && (description.dirty || description.touched)" style="color:chocolate; font-size: 12px;">Ayrıntı girişi zorunludur</div>
        <div></div>
      </div>
      <button type="submit" class="btn btn-primary" [disabled]="!frm.valid">Submit</button>
      <!-- [disabled]="!frm.valid  ekle-->
    </form>
  `,
})
export class CreateProductComponent {
  public Editor = ClassicEditor;
  frm: FormGroup;
  categories: Category[] = [];
  constructor(private formBuilder: FormBuilder, private firebaseService: ProductFirebaseService, private router: Router, private firebaseCategory: CategoryFirebaseService) {
    this.frm = formBuilder.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      description: ['', Validators.required],
      imageSource: ['', Validators.required],
      star: ['', Validators.required],
      isActive: [''],
      category: ['', Validators.required],
    });
    this.isActive.setValue(true);
    this.firebaseCategory.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
  onSubmit() {
    const product = {
      name: this.name.value,
      id: 1,
      price: this.price.value,
      imageSource: '../../assets/images/' + this.imageSource.value,
      description: this.description.value,
      isActive: this.isActive.value,
      categoryId: this.category.value,
      star: this.star.value,
    };
    this.firebaseService.createproduct(product).subscribe((data) => {});

    this.router.navigate(['/products']);
  }
  get name() {
    return this.frm.get('name');
  }
  get price() {
    return this.frm.get('price');
  }
  get description() {
    return this.frm.get('description');
  }
  get imageSource() {
    return this.frm.get('imageSource');
  }
  get star() {
    return this.frm.get('star');
  }
  get category() {
    return this.frm.get('category');
  }
  get isActive() {
    return this.frm.get('isActive');
  }
}
