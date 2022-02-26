import { Component, OnInit } from '@angular/core';
import { MovieService } from './../movie.service';

@Component({
  selector: 'loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
})
export class LoadingScreenComponent implements OnInit {
  visible: boolean = false;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.loadingEvent.subscribe(
      (data: any) => (this.visible = data)
    );
  }
}
