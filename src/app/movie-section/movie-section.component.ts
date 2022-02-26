import { Component, HostListener, Input, OnInit } from '@angular/core';

import { MovieService } from './../movie.service';

const tmdbImageBaseUrl = 'https://image.tmdb.org/t/p/original';

@Component({
  selector: 'movie-section',
  templateUrl: './movie-section.component.html',
  styleUrls: ['./movie-section.component.scss'],
})
export class MovieSectionComponent implements OnInit {
  @Input() section = '';
  movies: any = null;
  sectionsPagination: any;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.loadingEvent.emit(true);
    this.movieService
      .getMoviesBySection(this.section)
      .subscribe((data: any) => {
        this.movies = data.results;
        this.movieService.loadingEvent.emit(false);
      });

    this.sectionsPagination = {
      trending: 0,
      topRated: 0,
      originals: 0,
      animation: 0,
      action: 0,
      comedy: 0,
      horror: 0,
      romance: 0,
      documentary: 0,
    };
  }

  getImagePath(path: string) {
    return `${tmdbImageBaseUrl}${path}`;
  }

  getSectionTitle(section: string) {
    switch (section) {
      case 'trending':
        return 'Em alta';
      case 'topRated':
        return 'Recomendados para você';
      case 'originals':
        return 'Originais Netflix';
      case 'animation':
        return 'Animação';
      case 'action':
        return 'Ação';
      case 'comedy':
        return 'Comédia';
      case 'horror':
        return 'Terror';
      case 'romance':
        return 'Romance';
      case 'documentary':
        return 'Documentários';
      default:
        return '';
    }
  }

  selectMovie(index: number) {
    this.movieService.highlightMovie(this.movies[index]);
  }

  handlePrevButton(section: string) {
    let x =
      this.sectionsPagination[section as keyof typeof this.sectionsPagination] +
      Math.round(window.innerWidth / 2);

    if (x > 0) {
      x = 0;
    }

    this.sectionsPagination[section as keyof typeof this.sectionsPagination] =
      x;
  }

  handleNextButton(section: string) {
    let x =
      this.sectionsPagination[section as keyof typeof this.sectionsPagination] -
      Math.round(window.innerWidth / 2);
    let listW = this.movies.length * 180;

    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 60;
    }

    this.sectionsPagination[section as keyof typeof this.sectionsPagination] =
      x;
  }

  getSectionPagination(section: string) {
    return this.sectionsPagination[
      section as keyof typeof this.sectionsPagination
    ];
  }
}
