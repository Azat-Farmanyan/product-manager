import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Product } from '../components/products/products.component';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable(); // Observable для подписки в компонентах

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Fetch product list and notify subscribers
  fetchProducts(): void {
    const headers = this.getHeaders();
    this.http.get<Product[]>(this.authService.apiUrl, { headers }).subscribe(
      (products) => {
        this.productsSubject.next(products); // Обновляем данные в Subject
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  // Create a new product
  createProduct(product: Product): Observable<Product> {
    const headers = this.getHeaders();
    return this.http.post<Product>(this.authService.apiUrl, product, {
      headers,
    });
  }

  // Edit an existing product
  editProduct(product: Product): Observable<Product> {
    const headers = this.getHeaders();
    const url = `${this.authService.apiUrl}/${product.id}`;
    return this.http.put<Product>(url, product, { headers });
  }

  // Delete a product by ID
  deleteProduct(productId: number): Observable<void> {
    const headers = this.getHeaders();
    const url = `${this.authService.apiUrl}/${productId}`;
    return this.http.delete<void>(url, { headers });
  }

  // Notify components to refresh data
  refreshProducts(): void {
    this.fetchProducts(); // Загружаем данные и уведомляем подписчиков
  }

  // Helper method to get headers
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('Authorization token is missing');
    }

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }
}
