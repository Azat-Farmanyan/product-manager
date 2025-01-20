import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  type OnInit,
} from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ProductsService } from '../../services/products.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditProductDialogComponent } from '../../shared/components/EditProductDialog/EditProductDialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DeleteProductDialogComponent } from '../../shared/components/DeteleProductDialog/DeleteProductDialog.component';

export interface Product {
  id: number;
  name: string;
  description: string;
  sku: string;
  cost: number;
  profile: Record<string, any>;
}

@Component({
  selector: 'app-products',
  imports: [
    HeaderComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CurrencyPipe,
    CommonModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = []; // Store fetched products
  errorMessage: string = ''; // Store error message if any
  objectKeys = Object.keys;
  private destroy$ = new Subject<void>();
  isLoading = false;

  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Method to load products
  private loadProducts(): void {
    this.isLoading = true;
    // Подписываемся на изменения списка продуктов
    this.productsService.products$.subscribe((products) => {
      this.products = products;
      this.isLoading = false;
    });

    // Инициализируем загрузку продуктов
    this.productsService.refreshProducts();
  }

  onEditProduct(product: Product): void {
    console.log('Edit product:', product);

    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '400px',
      data: { ...product },
    });

    dialogRef.afterClosed().subscribe((updatedProduct) => {
      if (updatedProduct) {
        console.log('Saving updated product:', updatedProduct);

        this.productsService.editProduct(updatedProduct).subscribe(
          (savedProduct) => {
            // Update the product list with the saved product
            const index = this.products.findIndex(
              (p) => p.id === savedProduct.id
            );
            if (index !== -1) {
              this.products[index] = savedProduct;
            }

            // Show success notification
            this.snackBar.open('Product updated successfully!', 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
            });
            console.log('Product successfully updated:', savedProduct);
          },
          (error) => {
            console.error('Error updating product:', error);

            // Show error notification
            this.snackBar.open('Failed to update product.', 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
            });
          }
        );
      }
    });
  }

  onDeleteProduct(product: Product): void {
    const dialogRef = this.dialog.open(DeleteProductDialogComponent, {
      width: '300px',
      data: { ...product },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.productsService.deleteProduct(product.id).subscribe(
          () => {
            // Remove product from the list
            this.products = this.products.filter((p) => p.id !== product.id);

            // Show success notification
            this.snackBar.open('Product deleted successfully!', 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
            });

            console.log(`Product with ID ${product.id} deleted successfully`);
          },
          (error) => {
            console.error('Error deleting product:', error);

            // Show error notification
            this.snackBar.open('Failed to delete product.', 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
            });
          }
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
