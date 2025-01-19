import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatToolbarModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
