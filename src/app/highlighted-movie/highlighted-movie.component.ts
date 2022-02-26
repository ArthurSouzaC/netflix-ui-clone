import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from './../movie.service';

const tmdbImageBaseUrl = 'https://image.tmdb.org/t/p/original';

@Component({
  selector: 'highlighted-movie',
  templateUrl: './highlighted-movie.component.html',
  styleUrls: ['./highlighted-movie.component.scss'],
})
export class HighlightedMovieComponent implements OnInit {
  @Input() movieId: string = '';
  movie: any = null;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.loadingEvent.emit(true);
    this.movieService.getMovieById(this.movieId).subscribe((data: any) => {
      this.movie = data;
      this.movieService.loadingEvent.emit(false);
    });

    this.movieService.highlightMovieEvent.subscribe((movie: any) => {
      this.movie = movie;
      this.movieService.loadingEvent.emit(false);
    });
  }

  getImagePath(movie: any) {
    let path = movie.backdrop_path;
    return `${tmdbImageBaseUrl}${path}`;
  }

  getMovieReleaseYear(releaseDate: string) {
    return new Date(releaseDate).getFullYear().toString();
  }
}
