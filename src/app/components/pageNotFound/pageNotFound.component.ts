import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  imports: [],
  templateUrl: './pageNotFound.component.html',
  styleUrls: ['./pageNotFound.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class PageNotFoundComponent implements OnInit {
  ngOnInit(): void {}
}
