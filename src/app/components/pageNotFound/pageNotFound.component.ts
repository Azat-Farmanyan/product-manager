import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './pageNotFound.component.html',
  styleUrls: ['./pageNotFound.component.scss'],
  standalone: true,
})
export class PageNotFoundComponent {
  constructor(private router: Router) {}

  goToLogin(): void {
    this.router.navigate(['/login']); // Navigate to login page
  }

  goToProducts(): void {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.router.navigate(['/products']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
