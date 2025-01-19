import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../../components/products/products.component';

@Component({
  selector: 'app-detele-product-dialog',
  imports: [MatCardModule],
  templateUrl: './DeleteProductDialog.component.html',
  styleUrls: ['./DeleteProductDialog.component.scss'],
})
export class DeleteProductDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
