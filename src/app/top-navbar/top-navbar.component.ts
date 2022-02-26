import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss'],
  animations: [
    trigger('scroll', [
      state(
        'true',
        style({
          background: 'transparent',
        })
      ),
      state(
        'false',
        style({
          background: '#141414',
        })
      ),
      transition('true <=> false', animate('200ms linear')),
    ]),
  ],
})
export class TopNavbarComponent implements OnInit {
  transparent = 'true';

  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    let verticalOffset =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (verticalOffset > 0 && this.transparent == 'true') {
      this.transparent = 'false';
    }

    if (verticalOffset == 0 && this.transparent == 'false') {
      this.transparent = 'true';
    }
  }

  scrollTop() {
    console.log('a');

    window.scrollTo(0, 0);
  }
}
