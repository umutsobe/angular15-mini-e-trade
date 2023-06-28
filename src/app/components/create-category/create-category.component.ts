import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryFirebaseService } from 'src/app/services/category-firebase.service';

@Component({
  selector: 'app-create-category',
  styleUrls: ['./create-category.component.css'],
  template: `
    <form [formGroup]="frm" (ngSubmit)="onSubmit()" class="w-50 container">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" id="name" formControlName="name" />
        <div *ngIf="!name.valid && (name.dirty || name.touched)" style="color:chocolate; font-size: 12px;">İsim girişi zorunludur</div>
      </div>
      <button type="submit" [disabled]="!frm.valid" class="btn btn-primary">Submit</button>
    </form>
  `,
})
export class CreateCategoryComponent {
  frm: FormGroup;
  constructor(private formBuilder: FormBuilder, private firebaseCategory: CategoryFirebaseService) {
    this.frm = formBuilder.group({
      name: ['', Validators.required],
    });
  }
  get name() {
    return this.frm.get('name');
  }
  onSubmit() {
    this.firebaseCategory.createCategory({ id: 0, name: this.name.value, isActive: true }).subscribe((data) => {});
  }
}
