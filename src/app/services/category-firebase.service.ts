import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface ICategory {
  name: string;
  id: number;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryFirebaseService {
  constructor(private http: HttpClient) {}

  url: string = 'https://shoppappfirebase-cc9a2-default-rtdb.europe-west1.firebasedatabase.app/categories.json';

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url).pipe(
      map((data) => {
        const categories: Category[] = [];

        for (const key in data) {
          categories.push({ ...data[key], id: key });
        }
        return categories;
      })
    );
  }
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.url, category);
  }
}
export interface Category {
  name: string;
  id: any;
  isActive: boolean;
}
