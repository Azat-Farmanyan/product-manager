import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  type OnInit,
} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { Product } from '../../../components/products/products.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-create-product-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    MatExpansionModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    TitleCasePipe,
  ],
  templateUrl: './CreateProductDialog.component.html',
  styleUrls: ['./CreateProductDialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProductDialogComponent implements OnInit {
  types = ['furniture', 'equipment', 'stationary', 'part'];

  constructor(
    public dialogRef: MatDialogRef<CreateProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  ngOnInit(): void {
    // Set default values for profile fields
    if (!this.data.profile) {
      this.data.profile = {
        type: 'furniture', // Значение по умолчанию для type
        available: true, // Значение по умолчанию для available
      };
    }
    this.data.profile['type'] = this.data.profile['type'] || 'furniture';
    this.data.profile['available'] =
      this.data.profile['available'] !== undefined
        ? this.data.profile['available']
        : true;
  }

  // Get dynamic keys from the profile object
  getProfileKeys(): string[] {
    return Object.keys(this.data.profile || {}).filter(
      (key) => !['type', 'available', 'backlog'].includes(key)
    );
  }

  addCustomProperty(): void {
    const key = `key${Object.keys(this.data.profile).length}`;
    this.data.profile[key] = '';
  }

  removeCustomProperty(key: string): void {
    delete this.data.profile[key];
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
