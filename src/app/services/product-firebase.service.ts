import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, exhaustMap, map, take, tap } from 'rxjs';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class ProductFirebaseService {
  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private authService: AuthService) {}

  url: string = 'https://shoppappfirebase-cc9a2-default-rtdb.europe-west1.firebasedatabase.app/';

  getProducts(categoryId: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url + 'products.json').pipe(
      map((data) => {
        const products: IProduct[] = [];

        for (const key in data) {
          if (categoryId) {
            if (categoryId == data[key].categoryId) {
              products.push({ ...data[key], id: key });
            }
          } else {
            products.push({ ...data[key], id: key });
          }
        }
        return products;
      })
    );
  }
  createproduct(product: IProduct): Observable<IProduct> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.post<IProduct>(this.url + 'products.json?auth=' + user?.token, product);
      })
    );
  }
  getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(this.url + 'products/' + id + '.json');
  }
  getStar(star) {
    let htmlString: any;
    let filledStar: any = "<i class='p-star fa-solid fa-star'>";
    let emptyStar: any = "<i class='p-star fa-regular fa-star'></i>";

    if (star == 5) {
      htmlString = filledStar + filledStar + filledStar + filledStar + filledStar;
    } else if (star == 4) {
      htmlString = filledStar + filledStar + filledStar + filledStar + emptyStar;
    } else if (star == 3) {
      htmlString = filledStar + filledStar + filledStar + emptyStar + emptyStar;
    } else if (star == 2) {
      htmlString = filledStar + filledStar + emptyStar + emptyStar + emptyStar;
    } else if (star == 1) {
      htmlString = filledStar + emptyStar + emptyStar + emptyStar + emptyStar + emptyStar;
    } else if (star == 0) {
      htmlString = emptyStar + emptyStar + emptyStar + emptyStar + emptyStar + emptyStar;
    }

    let string = this.sanitizer.bypassSecurityTrustHtml(htmlString);
    return string;
  }
}
export interface IProduct {
  name: string;
  id: any;
  description: string;
  price: number;
  imageSource: string;
  isActive: boolean;
  star: number;
  categoryId: number;
}
