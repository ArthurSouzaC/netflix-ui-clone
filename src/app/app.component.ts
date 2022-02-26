import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'netflix-ui-clone';
  sections = [
    'trending',
    'topRated',
    'originals',
    'animation',
    'action',
    'comedy',
    'horror',
    'romance',
    'documentary',
  ];
}
