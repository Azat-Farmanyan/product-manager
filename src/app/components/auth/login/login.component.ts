import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    console.log('azaa');
  }
}
