import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const tmdbApiBaseUrl = 'https://api.themoviedb.org/3';
const tmdbApiKey = '1c81b3174a05a652b93bb31e532168fa';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  @Output() highlightMovieEvent = new EventEmitter<any>();
  @Output() loadingEvent = new EventEmitter<any>();

  constructor(private _http: HttpClient) {}

  apiFetch(endpoint: string, params: string) {
    return this._http.get(
      `${tmdbApiBaseUrl}${endpoint}?api_key=${tmdbApiKey}&language=pt-BR${params}`
    );
  }

  getMoviesBySection(section: string) {
    switch (section) {
      case 'trending':
        return this.apiFetch('/trending/movie/week', '');

      case 'topRated':
        return this.apiFetch('/movie/top_rated', '');

      case 'originals':
        return this.apiFetch('/discover/tv', '&with_networks=213');

      case 'animation':
        return this.apiFetch('/discover/movie', '&with_genres=16');

      case 'action':
        return this.apiFetch('/discover/movie', '&with_genres=28');

      case 'comedy':
        return this.apiFetch('/discover/movie', '&with_genres=35');

      case 'horror':
        return this.apiFetch('/discover/movie', '&with_genres=27');

      case 'romance':
        return this.apiFetch('/discover/movie', '&with_genres=10749');

      case 'documentary':
        return this.apiFetch('/discover/movie', '&with_genres=99');

      default:
        return this.apiFetch('/trending/movie/week', '');
    }
  }

  getMovieById(id: string) {
    return this.apiFetch(`/movie/${id}`, '');
  }

  getTVShowById(id: string) {
    return this.apiFetch(`/tv/${id}`, '');
  }

  highlightMovie(movie: any) {
    this.loadingEvent.emit(true);
    if (movie.first_air_date) {
      this.getTVShowById(movie.id).subscribe((data: any) =>
        this.highlightMovieEvent.emit(data)
      );
    } else {
      this.getMovieById(movie.id).subscribe((data: any) =>
        this.highlightMovieEvent.emit(data)
      );
    }
  }
}
