import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CreateProductDialogComponent } from '../CreateProductDialog/CreateProductDialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from '../../../services/products.service';
import { ProductsComponent } from '../../../components/products/products.component';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatToolbarModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private productsService: ProductsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onCreate(): void {
    // this.authService.logout();
    // this.router.navigate(['/login']);
    const dialogRef = this.dialog.open(CreateProductDialogComponent, {
      width: '400px',
      data: {
        name: '',
        description: '',
        cost: null,
        profile: {
          type: 'furniture',
          available: true,
          backlog: null,
        },
      },
    });

    dialogRef.afterClosed().subscribe((newProduct) => {
      if (newProduct) {
        this.productsService.createProduct(newProduct).subscribe(
          (createdProduct) => {
            // Show success notification
            this.snackBar.open('Product created successfully!', 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
            });

            this.productsService.refreshProducts();

            console.log('New product created:', createdProduct);
          },
          (error) => {
            console.error('Error creating product:', error);

            // Show error notification
            this.snackBar.open('Failed to create product.', 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
            });
          }
        );
      }
    });
  }
}
