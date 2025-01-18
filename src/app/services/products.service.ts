import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Product } from '../components/products/products.component';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  // Fetch product list using the token
  fetchProducts(): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('Authorization token is missing');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Product[]>(this.authService.apiUrl, { headers });
  }
}
