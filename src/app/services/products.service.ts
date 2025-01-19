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

  // Fetch product list
  fetchProducts(): Observable<Product[]> {
    const headers = this.getHeaders();
    return this.http.get<Product[]>(this.authService.apiUrl, { headers });
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
