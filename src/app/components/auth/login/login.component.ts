import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class LoginComponent implements OnInit {
  token: string = ''; // Model for the input field

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const savedToken = localStorage.getItem('auth_token');
    if (savedToken) {
      this.token = savedToken;
    }
  }

  onLogin(): void {
    if (!this.token.trim()) {
      return;
    }

    this.authService.saveToken(this.token);
    this.router.navigate(['/products']);
  }
}
